const mongoose = require('mongoose')

// define schema 
const UserRegisterSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    mobile:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }

},{timestamps:true})

const UserRegisterModel = mongoose.model('userRegister',UserRegisterSchema)
module.exports= UserRegisterModel