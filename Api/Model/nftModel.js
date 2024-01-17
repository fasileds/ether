const mongoose = require("mongoose")

const nftSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    desc:{
        type:String,
        trim:true
    },
    catagory:String,
    emaile:String,
    address:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    image:String,
})
const NFT =  mongoose.model("NFT",nftSchema)
module.exports = NFT