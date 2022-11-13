const express = require("express");
const VoterIDCards = require("../models/voterIDCards");
const router = express.Router();

router.post('/addVoterID', async (req, res) => {
    const {voterIdCardNumber,aadharCardNumber,name} = req.body;
    const voterIdCardData = VoterIDCards({
        voterIdCardNumber,
        aadharCardNumber,
        name
    });
    await voterIdCardData.save();
    res.status(201).json({ message: "Voter ID Card Data Added" });
});

router.get('/addVoterID', async (req, res) => {
    await VoterIDCards.find({}).then((data) => {
        res.status(201).json(data);
    })
});

module.exports = router;