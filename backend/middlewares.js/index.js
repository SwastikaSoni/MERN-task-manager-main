const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET } = process.env;


exports.verifyAccessToken = async (req, res, next) => {

  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
  let user;
  try {
    user = jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    user = await User.findById(user.id);
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.verifyAdmin = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
  
  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const foundUser = await User.findById(user.id);
    if (!foundUser) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }
    
    if (!foundUser.isAdmin) {
      return res.status(403).json({ status: false, msg: "You are not authorized to access this route" });
    }
    
    req.user = foundUser;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }
};
