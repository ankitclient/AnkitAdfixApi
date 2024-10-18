const mongoose = require ('mongoose')

const AccountentSchema = mongoose.Schema({

    name:{
        type:String,
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

const AccountentModel = mongoose.model('AccountentRegiter',AccountentSchema)

module.exports = AccountentModel
