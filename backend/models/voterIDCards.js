const mongoose = require("mongoose");

const voterIDCardSchema = new mongoose.Schema({
    voterIdCardNumber: {
        type: String,
        required:true
    },
    aadharCardNumber: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    }
});

const VoterIDCard = mongoose.model("VoterIDCard", voterIDCardSchema);
module.exports = VoterIDCard;