const express = require("express")
const nftControler = require("../Controllers/nftController")
const router = express.Router()

router.route("/").get(nftControler.getAllNfts).post(nftControler.createNft)

router.route("/:id").get(nftControler.getNft)

module.exports=router