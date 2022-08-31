const Election = require("../models/election");

const addElection = async (req, res) => {
    const {electionType,electionDate,partiesContesting} = req.body;
    const newElection = Election({
        electionDate,
        electionType,
        partiesContesting
    });
    await newElection.save();
    res.status(201).json({ message: "Election Added" });
}

const getElections = async (req, res) => {
    Election.find({}).then((data) => {
        res.status(201).json({ data });
    })
}

module.exports = {
    addElection,
    getElections
}