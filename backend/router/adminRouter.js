const express = require("express");
const { authorizeAdmin } = require("../middleware/authenticationForAdmin");
const Party = require("../models/party");
const router = express.Router();


router.get(
  "/api/admin/allparties",
  authorizeAdmin,
  async (req, res) => {
    const allParties = await Party.find({});
    if (allParties.length == 0) {
      res.status(404).json("No Party found");
    } else {
      res.status(200).json(allParties);
    }
  }
);

router.get(
  "/api/admin/resultparties",
  authorizeAdmin,
  async (req, res) => {
    const allParties = await Party.find({}).sort({ TotalVotes: -1 });
    if (allParties.length == 0) {
      res.status(400).json("No Candidate found");
    } else {
      res.status(200).json(allParties);
    }
  }
);



module.exports = router;
