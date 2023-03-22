const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Transaction = new Schema({
    categoryId : {
        type : String,
    },
    userId : {
        type : String,
    },
    transactionAmount : {
        type : Number,
    },
    paymentWith : {
        type : String,
    },
    paymentStatus : {
        type : String,
    },
    paymentVA : {
        type : String,
    },
    paymentQR : {
        type : String,
    },
    ticketQRPath : {
        type : String,
    },
    ticketStatus : {
        type : String,
    },
   
}, {
    timestamps : true
});

module.exports = mongoose.model('Transaction', Transaction)