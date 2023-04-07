// import bcrypt from "bcyrpt";
// import jwt from "jsonwebtoken";

// const { validationResult } = require("express-validator");
// const path = require("path");
// const fs = require("fs");
const argon2 = require("argon2");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res, next) => {
  const currPage = req.query.page || 1;
  const perPage = req.query.perPage || 12;
  const paramKey = req.query.paramKey || "null";
  const paramValue = req.query.paramValue || "null";

  let totalItems;

  if (paramKey === "null" || paramValue === "null") {
    User.find()
      .countDocuments()
      .then((result) => {
        totalItems = result;

        return User.find()
          .skip((parseInt(currPage) - 1) * parseInt(perPage))
          .limit(parseInt(perPage));
      })
      .then((result) => {
        const response = {
          message: "Get All Users Success",
          user: result,
          total_data: totalItems,
          per_page: parseInt(perPage),
          current_page: parseInt(currPage),
        };

        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getUserById = (req, res, next) => {
    console.log(`Start Get User by ID`);
  User.findById(req.user.userId)
    .then((result) => {
      if (!result) {
        const error = new Error("Event not found");
        error.errorStatus = 404;
        throw error;
      }
      const response = {
        message: "Get User Success",
        user: result,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.createUser = async (req, res, next) => {
  console.log(`Start Process Create User ${req.body.email}`);
  const { name, email, password, confPassword, type } = req.body;
  const checkUser = await User.findOne().where({ userEmail: req.body.email });
  console.log(`User Result: ${checkUser}`);

  if (!checkUser) {
    console.log("User Not Found, continue to next step...");
    if (password !== confPassword) {
      console.log("FAILED Password Not Match...");
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" });
    }
    console.log("Success Password Match...");
    const hashPassword = await argon2.hash(password);
    try {
      console.log("Creating User...");
      const user = await User.create({
        userName: name,
        userEmail: email,
        userPassword: hashPassword,
        userType: type,
      });
      const token = jwt.sign(
        {
          userId: user.id,
          userEmail: user.userEmail,
          userName: user.userName,
          userType: user.userType,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      console.log("SUCCESS Create User, token: " + token);
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      console.log("FAILED Create User");
      res.status(400).json({ msg: error.message });
    }
  } else {
    console.log(`Email Already Exist, user ${checkUser}`);
    console.log("FAILED Create User");
    return res.status(400).json({ msg: "Email Already Exist" });
  }
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, confPassword, type } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await User.updateOne(
      {
        userName: name,
        userEmail: email,
        userPassword: hashPassword,
        userType: type,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// exports.SignUp = async (req, res, next) => {
//   console.log("Start Insert User to DB");
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const err = new Error("Value Does Not Match");
//     err.errorStatus = 400;
//     err.data = errors.array();
//     throw err;
//   }

//   const userEmail = req.body.email;
//   const userPassword = req.body.password;
//   const userConfPassword = req.body.confPassword;
//   const userType = "C";

//   if(userPassword !== userConfPassword){
//     return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
//   }

//   const salt = await bcrypt.genSalt();
//   const hashPassword = await bcrypt.hash(userPassword, salt);

//   const PostUser = new User({
//     userEmail: userEmail,
//     userPassword: hashPassword,
//     userType: userType,
//   });

//   PostUser.save()
//     .then((result) => {
//       const response = {
//         message: "Create User Success",
//         event: result,
//       };

//       res.status(201).json(response);
//     })
//     .catch((err) => {
//       console.log("err: ", err);
//     });
// };

// exports.SignIn = async (req, res, next) => {
//   console.log("Start Sign in Process");
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const err = new Error("Value Does Not Match");
//     err.errorStatus = 400;
//     err.data = errors.array();
//     throw err;
//   }

//   try {
//     const user = User.find()
//   .where([{userEmail: req.body.email}])

//   const match = await bcrypt.compare(req.body.password, user[0].userPassword);
//   if(!match) return res.status(400).json({msg: "Wrong Password"});

//   const userId = user[0].id;
//   const userEmail = user[0].userEmail;
//   const userName = user[0].userName;
//   const accessToken = jwt.sign({userId, userName, userEmail}, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: '20s'
//   });
//   const refreshToken = jwt.sign({userId, userName, userEmail}, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn:'1d'
//   })

//   await User.update({refresh_token: refresh_tolem},{
//     where:{id: userId}
//   });

//   res.cookie('refreshToken', refreshToken,{
//     httpOnly: true,
//     maxAge: 24*60*60*1000
//   })

//   res.json({accessToken});
//   } catch (error) {
//     res.status(404).json({msg: "Email tidak ditemukan"})
//   }

// }

// exports.LogOut = async(req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if(!refreshToken) return res.sendStatus(204);
//     const user = User.find()
//         .where([{refresh_token: refreshToken}])
//     if(!user[0]) return res.sendStatus(204);
//     const userId = user[0].id;
//     await User.update({refresh_token: null}).where({id: userId});
//     res.clearCookie('refreshToken');
//     return res.sendStatus(200);

// }
