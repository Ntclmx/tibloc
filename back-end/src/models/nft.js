const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NFT = new Schema({
    nftImage : {
        type : String,
    },
    nftProbability : {
        type : Number,
    },
    categoryId : {
        type : String,
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('NFT', NFT, 'NFT')
