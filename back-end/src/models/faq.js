const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Faq = new Schema({
    question : {
        type : String,
    },

    answer : {
        type : String,
    },
    // articleTitle : {
    //     type : String,
    // },
    // articleBody : {
    //     type : String,
    // },
    // articleAuthor : {
    //     type : String,
    // },
    // articleImage : {
    //     type : String,
    // },
}, {
    timestamps : true
});

module.exports = mongoose.model('Faq', Faq)