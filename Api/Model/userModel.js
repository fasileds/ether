const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    emaile:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"

    },
    password:{
        type:String,
        required:true
    },
    passwordConiform:{
        type:String,
        required:true,
        validate:{
            validator: function (el){
                return el === this.password
            },
            message:"pssword is not the same!"
        }
    },
})

userSchema.pre("save", async function(next){
    if(!this.isModifide("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConiform= undefined
    next()
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")||this.isNew){
        return next()
    }
    this.passwordChangedAt = Data.now() - 1000
    next()
})

userSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}})
    next()
})
userSchema.method.correctPassword = async function(candiadatePassword,
    userPassword)
    {
    return await bcrypt.compare(candiadatePassword,userPassword)
};
userSchema.methods.chanegePasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10)
        return  JWTTimestamp <changedTimeStamp
    }

    return false

};

const user = mongoose.model("User",userSchema)
module.exports= user