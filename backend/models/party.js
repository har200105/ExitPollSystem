const mongoose = require("mongoose");

const partySchema = mongoose.Schema({
    partyId: {
      type: String,
      required: true,
    },
    partyName: {
      type: String,
      required: true,
    },
    partyLogo: {
      type: String,
      required: true,
    },
    TotalVotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
