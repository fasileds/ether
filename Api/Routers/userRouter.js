const express =require("express")

const autheCountlorer = require("../Controllers/authController")
const router = express.Router()

router.post("/signUp",autheCountlorer.signUp);
router.post("/login", autheCountlorer.logIn);

module.exports= router