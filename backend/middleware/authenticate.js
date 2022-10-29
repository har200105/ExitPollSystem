const Voter = require("../models/voter");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, process.env.Token_Private_Key);
    const currentVoter = await Voter.findById(verifyToken.id);
    if (!currentVoter) {
      res.status(401);
      throw new Error(`Voter not found`);
    }
    req.user = currentVoter;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json("Token Not Found Please Login First");
  }
};

module.exports = authentication;
