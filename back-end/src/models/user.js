const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/tibloc", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// });

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
}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema, "User");
module.exports = User;