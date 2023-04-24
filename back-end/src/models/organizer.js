const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Organizer = new Schema({
    organizerLogo : {
        type : String,
    },
    organizerName : {
        type : String,
    },
    organizerEmail : {
        type : String,
    },
    organizerPhoneNumber : {
        type : String,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('Organizer', Organizer, 'Organizer')
