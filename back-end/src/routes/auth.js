const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require('../controllers/auth');
const cors = require("cors");
const {verifyToken} = require("../middleware/AuthUser");

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(cors());

// router.post("/sign-up", authController.signUp);

router.post("/sign-in", authController.signIn);
router.get("/sign-out", authController.signOut);
router.post("/welcome", verifyToken, (req, res) => {
    const welcomeUser = `Welcome ${req.user.name}`
    res.status(200).send(welcomeUser);
  });
// router.get("/me", auth, authController.Me);


router.get("/login/success",(req,res) => {
    if(req.user){
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        })
    }else{
        res.status(403).json({
            error: true,
            message: "Not Authorized",
        });
    }
});

router.get("/login/failed",(req,res) => {
    res.status(401).json({
        error: true,
        message: "Login failure",
    });
});

router.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",

    })
);

router.get("/google", passport.authenticate("google",["profile","email"]));

router.get("/logout",(req,res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

router.get("/", (req,res) => {
    console.log("gak ada di auth")
    res.status(404).send("hadeh gamasuk");
});

module.exports = router;
