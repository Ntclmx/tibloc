const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Wishlist = new Schema({
    userId : {
        type : String,
    },
    eventId : {
        type : String,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('Wishlist', Wishlist)