const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");
const bcrypt = require("bcrypt");
const authentication = require("../middleware/authenticate");
const { authorizeAdmin } = require("../middleware/authenticationForAdmin");


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
      const result = await newVoter.save();
      res.json(JSON.stringify(result)).status(201);
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
      res.status(401).json("Login failed Invalid Cradentials");
    }
  } else {
    res.status(400).json("Email not found");
  }
});

router.get("/api/voteregistration", authentication, async(req, res) => {
  await Voter.findById(req.currentVoterId).then((data) => {
      res.status(200).json(data);
  });
});

router.post("/api/voteregistration", async (req, res) => {
  try {
    const { cid, adharCard, voterno, birthdate, age, city, rstate, address } =
      req.body;

    const findVoter = await Voter.findOne({ _id: cid });

    const voterIdExists = await Voter.findOne({ voterId: voterno });
    if (voterIdExists === null) {
      findVoter.adharCard = adharCard;
      findVoter.voterId = voterno;
      findVoter.age = age;
      findVoter.birthDate = birthdate;
      findVoter.city = city;
      findVoter.rstate = rstate;
      findVoter.address = address;
      findVoter.save();
      res.status(201).json(voterno);
    } else {
      res.status(409).json("Voter Id " + voterno + " already available !!");
    }
  } catch (e) {
    res.status(400).json("Somthing Went Wrong !!");
  }
});


router.post("/api/currentvoter", authentication, async (req, res) => {
  try {
    const currentVoter = await Voter.findOne({ _id: req.currentVoterId });
    console.log(currentVoter.voterId);
    if (currentVoter.voterId === undefined) {
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
