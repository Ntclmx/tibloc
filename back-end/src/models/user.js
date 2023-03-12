const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    userEmail : {
        type : String,
    },
    userPassword : {
        type : String,
    },
    userType : {
        type : String,
    },
    eventId : {
        type : String,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('User', User)