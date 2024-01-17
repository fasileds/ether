const NFT = require("../Model/nftModel")


exports.getAllNfts = async(req,res,next)=>{
    const nfts =await NFT.find()


    res.status(200).json({
        status:"succes",
        result:nfts.length,
        data:{nfts}
    })

}

exports.getNft= async(req,res,next)=>{
    const nft = await NFT.findById(req.params.id)

    res.status(200).json({
        status:"succes",
        data:{
            nft,
        }
    })
}

exports.createNft=async(req,res,next)=>{
    const newNft= await NFT.create(req.body);
    res.status(200).json({
        status:"succes",
        data:{
            nft:newNft
        }
    })
}


