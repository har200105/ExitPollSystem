const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    CandidateId: {
      type: String,
      required: true,
    },
    CandidateName: {
      type: String,
      required: true,
    },
    CandidatePartyName: {
      type: String,
      required: true,
    },
    CandidateAge: {
      type: Number,
      required: true,
    },
    CandidateImage: {
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

const Candidate = new mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
