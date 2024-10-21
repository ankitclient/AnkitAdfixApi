const mongoose = require('mongoose')

const CrmSchema = mongoose.Schema({
    
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

const CrmModel = mongoose.model('CRM',CrmSchema)
module.exports = CrmModel