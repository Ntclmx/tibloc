const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nftSchema = new Schema({
    categoryId : {
        type : String,
    },
    nftPath : {
        type : String,
    },
    nftProbability : {
        type : String,
    },
}, {
    timestamps : false
});

const NFT = mongoose.model("NFT", nftSchema, "NFT");
module.exports = NFT;