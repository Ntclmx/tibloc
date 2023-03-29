const User = require("../models/user");
const argon2 = require("argon2");

exports.signIn = async (req, res) =>{
    console.log(`Start Sign In Process for ${req.body.email}`);
    const user = await User.findOne().where({userEmail: req.body.email});
    console.log(`User Result: ${user}`);
    if(!user){
        if(user.userEmail !== req.body.email){
            console.log(`FAILED! User Not Found`);
            return res.status(404).json({msg: "User tidak ditemukan"});
        }
    }
    console.log(`Check Password`);
    const match = await argon2.verify(user.userPassword, req.body.password);
    if(!match){
        console.log(`FAILED! Wrong Password`);
        return res.status(400).json({msg: "Wrong Password"});
    }
    console.log(`Password Match`);

    req.session.userId = user.id;
    const id = user.id;
    const userName = user.userName;
    const userEmail = user.userEmail;
    const userType = user.userType;
    req.session.save();
    console.log(req.session);
    res.status(200).json({id, userName, userEmail, userType});
}

exports.Me = async (req, res) =>{
    console.log(req.session);
    console.log(`Start get User info with id ` + req.session.userId);
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne().where({id: req.session.userId});
    console.log(`User Result: ${user}`);
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

exports.signOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}