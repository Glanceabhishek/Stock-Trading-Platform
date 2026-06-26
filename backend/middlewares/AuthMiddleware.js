const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {

  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1]; // support both cookie and header token

  
  if (!token) {
    return res.json({ status: false, message: "No token provided" });
  }


  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Token verification failed" });
    } else {
      
      const user = await User.findById(data.id);
      if (user) {
        return res.json({ 
          status: true, 
          user: user.username,
          message: "User verified successfully" 
        });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  });
};