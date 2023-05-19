const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.id != req.headers.id) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { requireSignIn, isAdmin };
