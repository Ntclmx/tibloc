const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userEmail : {
        type : String,
    },
    userPassword : {
        type : String,
    },
    userType : {
        type : String,
    },
    userName : {
        type : String,
    },
    refresh_token : {
        type : String,
    },
}, {
    timestamps : false
});

const User = mongoose.model("User", userSchema, "User");
module.exports = User;