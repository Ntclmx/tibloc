const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Admin = new Schema({
    publicAddress : {
        type : String,
    },
}, {
    timestamps : false
});

const User = mongoose.model("Admin", Admin, "Admin");
module.exports = User;