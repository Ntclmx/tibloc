const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blockchainSchema = new Schema({
    tokenId : {
        type : String,
    },
    userId : {
        type : String,
    },
    nftId : {
        type : String,
    },
    paymentDate : {
        type : Date,
    },
    usedFlag : {
        type : Boolean,
    },
}, {
    timestamps : false
});

const Blockchain = mongoose.model("Blockchain", blockchainSchema, "Blockchain");
module.exports = Blockchain;