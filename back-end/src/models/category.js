const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
    eventId : {
        type : String,
    },
    categoryName : {
        type : String,
    },
    categoryDescription : {
        type : String,
    },
    categoryPrice : {
        type : Number,
    },
    categoryStock : {
        type : Number,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('Category', Category)