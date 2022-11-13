const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const VoterSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default:false
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default:"user"
    },
    registerDate: {
      type: Date,
      default: new Date(),
    },
    voterId: {
      type: String,  
    },
    age: {
      type: Number,
    },
    adharCard: {
       type: Number,  
    },

    birthDate: {
      type: String,
    },
    city: {
      type: String,
    },
    rstate: {
      type: String,
    },
    address: {
      type: String,
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

VoterSchema.methods.generateToken = async function () {
  let token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

const Voter =  mongoose.model("Voter", VoterSchema);

module.exports = Voter;
