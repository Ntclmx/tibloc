const User = require("../models/user");

exports.verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne().where({id: req.session.userId});
    console.log(`User Result: ${user}`);
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.userType; 
    next();
}

exports.adminOnly = async (req, res, next) =>{
    const user = await User.findOne().where({id: req.session.userId});
    console.log(`User Result: ${user}`);
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.userType !== "A") return res.status(403).json({msg: "Akses terlarang"});
    next();
}