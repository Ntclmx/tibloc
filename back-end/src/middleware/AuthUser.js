// const User = require("../models/user");

// exports.verifyUser = async (req, res, next) =>{
//     if(!req.session.userId){
//         return res.status(401).json({msg: "Mohon login ke akun Anda!"});
//     }
//     const user = await User.findOne().where({id: req.session.userId});
//     console.log(`User Result: ${user}`);
//     if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
//     req.userId = user.id;
//     req.role = user.userType; 
//     next();
// }

// exports.adminOnly = async (req, res, next) =>{
//     const user = await User.findOne().where({id: req.session.userId});
//     console.log(`User Result: ${user}`);
//     if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
//     if(user.userType !== "A") return res.status(403).json({msg: "Akses terlarang"});
//     next();
// }

const jwt = require("jsonwebtoken");

const config = process.env;

exports.verifyToken = (req, res, next) => {
    console.log(`Start Verify Token`);
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    console.log(decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};