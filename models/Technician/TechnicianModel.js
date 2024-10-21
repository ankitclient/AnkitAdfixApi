const mongoose = require('mongoose')

const TechnicianSchema = mongoose.Schema({
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
    age:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    work:{
        type: String,
        required:true
    },
    workingtime:{
        type: String,
        required:true
    }
    
},{timestamps:true})

const TechnicianModel = mongoose.model('technician', TechnicianSchema)

module.exports = TechnicianModel