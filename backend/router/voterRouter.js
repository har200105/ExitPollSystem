const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const authentication = require("../middleware/authenticate");
const { authorizeAdmin } = require("../middleware/authenticationForAdmin");
const { isValidVoter } = require("../middleware/isValidVoter");


router.get("/api/me", authentication, (req, res) => {
  res.status(200).json({success:true,user:req.user});
});

router.get("/api/admin/allvoters",authorizeAdmin, async (req, res) => {
  const allVoters = await Voter.find({});
  if (allVoters.length == 0) {
    res.status(400).json("No Candidate found");
  } else {
    res.status(200).json(allVoters);
  }
});

router.post("/api/register", async (req, res) => {
  const { firstname, lastname, email, phoneno, password } = req.body;
  const existEmail = await Voter.findOne({ email });

  if (existEmail) {
    res.status(409).json(email + " already exist !!");
  } else {
      const newHashPassword = await bcrypt.hash(password.toString(), 10);
      const newVoter = new Voter({
        firstname,
        lastname,
        phoneno,
        email,
        password: newHashPassword,
      });
      await newVoter.save();
      res.json({success:true}).status(201);
  }
});



router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const findVoter = await Voter.findOne({ email });
  if (findVoter) {
    const validPassword = await bcrypt.compare(
      password.toString(),
      findVoter.password
    );

    if (validPassword) {
      const token = await findVoter.generateToken();

      res.cookie("jwt_token", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });

      res.status(200).json({success:true,user:findVoter,token});
    } else {
      res.status(200).json({success:true,error:"Login failed Invalid Cradentials"});
    }
  } else {
    res.status(400).json("Email not found");
  }
});


router.post("/api/voteregistration",isValidVoter,async (req, res) => {
  try {
    const { cid, adharCard, voterno, birthdate, age, city, rstate, address } =
      req.body;
    const findVoter = await Voter.findOne({ _id: cid });
      findVoter.adharCard = adharCard;
      findVoter.voterId = voterno;
      findVoter.age = age;
      findVoter.birthDate = birthdate;
      findVoter.city = city;
      findVoter.rstate = rstate;
      findVoter.address = address;
      await findVoter.save();
      res.status(201).json({message:voterno + " Saved"});
  } catch (e) {
    console.log(e);
    res.status(400).json("Somthing Went Wrong !!");
  }
});


router.put("/resetUserIsVote", authentication, async (req, res) => {
  try {
    await Voter.updateMany({}, {
      $set: {
        isVoted: false
      }
    });
    res.status(201).json({ message: "Is Voted Reset Successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json("Somthing Went Wrong !!");
  }
});


router.post("/api/currentvoter", authentication, async (req, res) => {
  try {
    const currentVoter = await Voter.findOne({ _id: req.currentVoterId });
    console.log(currentVoter.voterId);
    if (currentVoter.voterId === undefined || !currentVoter.voterId) {
      res.status(400).json("Please Register First For Vote");
    } else {
      if (currentVoter.isVoted) {
        res.status(401).json("You Have Already voted for this Election");
      } else {
        currentVoter.isVoted = true;
        currentVoter.save();
        res.status(201).json(currentVoter.voterId);
      }
    }
  } catch (e) {
    res.status(400).json("Somthing Went Wrong !!");
  }
});




module.exports = router;
