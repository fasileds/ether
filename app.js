const express = require("express")
const cors = require("cors")
const nftRouter = require("./Api/Routers/nftRouter")
const userRouter = require("./Api/Routers/userRouter")
const app = express()
app.use(express.json({limit:"100kb"}))
app.use("/api/v1/NFTs",nftRouter)
app.use("/api/v1/NFTs",userRouter)
app.use(cors())
app.options("*",cors())
module.exports = app