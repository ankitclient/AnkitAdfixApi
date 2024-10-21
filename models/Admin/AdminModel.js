const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
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

const AdminModel = mongoose.model('Admin', AdminSchema)
module.exports = AdminModel