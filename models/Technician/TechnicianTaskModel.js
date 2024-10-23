const mongoose = require('mongoose')

const TechnicianTaskSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    }
},{timestamps:true})

const TechnicianTaskModel = mongoose.model('technicianTask', TechnicianTaskSchema)

module.exports = TechnicianTaskModel