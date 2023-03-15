const passport = require("passport");
const User = require("../models/user");
const userController = require("../controllers/user");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "348334482720-r76gtpogm62h5tkdusv3o4fp38rq2hfp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/home",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          googleId: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Request Empty");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const { email, password } = req.body;
  try {
    const check = await User.findOne({ userEmail: email });
    if (check) {
      res.status(200).json("email-exist");
    } else {
      userController.postUser(req, res, next);
      res.status(200).json("sucess-signup");
    }
  } catch (e) {
    res.status(400).json("exception");
    console.log(e);
  }
};

exports.signIn = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Value Does Not Match");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  console.log("Start sign in process");
  const { email, password } = req.body;
  console.log(`email : ${email} | password : ${password}`);

  try {
    const check = await User.findOne({ userEmail: email });
    if (check) {
      console.log("User exists");
      if (password === check.userPassword) {
        if (check.userType === "C") {
          res.status(200).json("user-customer");
        } else if (check.userType === "A") {
          res.status(200).json("user-admin");
        }
      } else {
        res.status(200).json("wrong-password");
      }
    } else {
      res.status(200).json("user-notexists");
    }
  } catch (e) {
    res.status(400).json("exception");
    console.log(e);
  }
};
