const VoterIDCard = require("../models/voterIDCards");

exports.isValidVoter = async(req, res, next) => {
    const voterIdCardNumber = req.user.voterId;
    const aadharCardNumber = req.user.aadharCardNumber;
    const isExist =  await VoterIDCard.findOne({
            $and: 
            [{ voterIdCardNumber: voterIdCardNumber },
            {aadharCardNumber:aadharCardNumber}]
    });
    if (isExist) {
        req.isValid = true; 
        next();
    } else {
        res.status(401).json("Token Not Found Please Login First");
    }
}