const jwt = require("jsonwebtoken");
const {ErrorHandler} = require("../errorMiddlewares/error");

exports.authorizeAdmin = (req, res, next) => {
    if (!(req.user.role === "admin")) {
        return next(
            new ErrorHandler(
                `${req.user.role} is not allowed.`,
                403
            )
        );
    }

  next();
};
