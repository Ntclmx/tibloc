const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Faq = new Schema({
    question : {
        type : String,
    },

    answer : {
        type : String,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('Faq', Faq)