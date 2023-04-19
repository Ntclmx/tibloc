const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Event = new Schema({
    eventTitle : {
        type : String,
    },
    eventDescription : {
        type : String,
    },
    eventTnc : {
        type : String,
    },
    eventAddress : {
        type : String,
    },
    eventDate : {
        type : String,
    },
    eventLogo : {
        type : String,
    },
    eventOrganizer : {
        type : String,
    },
    eventTime : {
        type : String,
    },
    eventCategory : {
        type : String,
    },
    eventCategoryId : {
        type : String,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('Event', Event, 'Event')