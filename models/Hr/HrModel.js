const mongoose = require('mongoose')

const HrSchema = mongoose.Schema({

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

const HrModel = mongoose.model('Hr', HrSchema)
module.exports = HrModel
