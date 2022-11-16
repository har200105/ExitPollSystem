const VoterIDCard = require("../models/voterIDCards");

exports.isValidVoter = async(req, res, next) => {
    const voterIdCardNumber = req.body.voterno;
    const aadharCardNumber = req.body.adharCard;
    const isExist =  await VoterIDCard.findOne({
            $and: 
            [{ voterIdCardNumber: voterIdCardNumber },
            {aadharCardNumber:aadharCardNumber}]
    });
    if (isExist) {
        req.isValid = true; 
        next();
    } else {
        res.status(401).json("Invalid Voter");
    }
}