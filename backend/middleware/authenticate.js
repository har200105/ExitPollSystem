const Voter = require("../models/voter");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json("Voter Not Found");
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const currentVoter = await Voter.findById(verifyToken.id);
    if (!currentVoter) {
     res.status(401).json("Voter Not Found");
    }
    req.user = currentVoter;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json("Token Not Found Please Login First");
  }
};

module.exports = authentication;
