const jwt = require("jsonwebtoken")
const User=require("../Model/userModel")

const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken= (user,statusCode,req,res)=>{
    const token = signToken(user._id)
    res.cookie("jwt",token,{
        expires:new Date(
            Date.now()+process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000
        ),
        httpOnly:true,
        secure:req.secure||req.headers["x-forwarded-proto"]==="https"
        
    })
    user.password=undefined;




res.status(statusCode).json({
    status:"succes",
    token,
    data:{
        user,
    }
})}

exports.signUp= async(req,res,next)=>{
    const newUser =  await User.create({
        userName:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConiform:req.body.coniformPassword
    })
    createSendToken(newUser,201,req,res)
}

exports.logIn=async (req,res,next)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(404).json({
            status:"fail",
            message:"the emialie or password dose not exist"
        })
    }

    const user = await User.findOne({email}).select("+password")
    if(!user|| !(await user.correctPassword(password,user.password))){
        res.status(401).json({
            status:"fail",
            message:"INCORECT EMAIL OR PASSWORD"
        })
    }
    createSendToken(user,200,req,res)

}

