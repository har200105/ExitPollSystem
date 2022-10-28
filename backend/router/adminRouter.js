const express = require("express");
const { authorizeAdmin } = require("../middleware/authenticationForAdmin");
const Candidate = require("../models/candidate");
const router = express.Router();




router.get(
  "/api/admin/allcandidates",
  authorizeAdmin,
  async (req, res) => {
    const allCamdidates = await Candidate.find({});
    if (allCamdidates.length == 0) {
      res.status(404).json("No Candidate found");
    } else {
      res.status(200).json(allCamdidates);
    }
  }
);

router.get(
  "/api/admin/resultcandidates",
  authorizeAdmin,
  async (req, res) => {
    const allcandidates = await Candidate.find({}).sort({ TotalVotes: -1 });
    if (allcandidates.length == 0) {
      res.status(400).json("No Candidate found");
    } else {
      res.status(200).json(allcandidates);
    }
  }
);



module.exports = router;
