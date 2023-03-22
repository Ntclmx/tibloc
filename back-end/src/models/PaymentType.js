const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentType = new Schema({
    paymentTypeName : {
        type : String,
    },
    paymentTypeKind : {
        type : String,
    },
    paymentTypeLogo : {
        type : String,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('PaymentType', PaymentType)