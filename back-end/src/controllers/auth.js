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
    const match = await argon2.verify(user.userPassword, req.body.password);
    if(!match){
        console.log(`FAILED! Wrong Password`);
        return res.status(400).json({msg: "Wrong Password"});
    }
    req.session.userId = user.id;
    const id = user.id;
    const name = user.userName;
    const email = user.userEmail;
    const type = user.userType;
    res.status(200).json({id, name, email, type});
}

exports.Me = async (req, res) =>{
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