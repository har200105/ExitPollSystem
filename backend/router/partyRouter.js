const express = require("express");
const Party = require("../models/party");
const router = express.Router();
const authentication = require("../middleware/authenticate");
const multer = require("multer");
const cloudinary = require("cloudinary");
const Voter = require("../models/voter");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/api/addparty",
  upload.single("partyLogo"),
  async (req, res) => {
    try {
      const { partyName, partyId } = req.body;

      const availableId = await Party.findOne({ partyId });
      if (!availableId) {
        const newParty = await Party({
          partyName,
          partyId,
          partyLogo: req.file.filename,
        });
        if (req.file) {
          await cloudinary.uploader.upload(req.file.path, {
            transformation: {
              width: 1280,
              height: 720,
            },
          });
        }
        const result = await newParty.save();
        res.status(201).json(result._id);
      } else {
        res.status(409).json(partyName + " is already available");
      }
    } catch (error) {
      res.status(500).json("Somthing Went Wrong");
    }
  }
);

router.get("/api/allparties", authentication, async (req, res) => {
  const allParties = await Party.find({});
  if (allParties.length == 0) {
    res.status(400).json("No Party found");
  } else {
    res.status(200).json(allParties);
  }
});

router.get("/api/resultparties", authentication, async (req, res) => {
  const allParties = await Party.find({}).sort({ TotalVotes: -1 });
  if (allParties.length == 0) {
    res.status(400).json("No Party found");
  } else {
    res.status(200).json(allParties);
  }
});

router.post("/api/countvotes",authentication,async (req, res) => {
  try {
      const partyName = req.body.partyName;
      const currentParty = await Party.findOne({
        partyName,
      });
      currentParty.TotalVotes++;
      await currentParty.save();
      await Voter.findByIdAndUpdate(req.user._id, {
        $set: { isVoted: true }
      });
      res.status(201).json({
        msg: "Your Vote Count Successfully for " + currentParty.partyName,
        ans: currentParty.partyId,
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
