const mongoose = require('mongoose')

const AddServiceSchema = mongoose.Schema({
    
    Category:{
        type:String,
        required:true
    },
    ServiceName:{
        type:String,
        required:true
    },
    ServiceDescription:{
        type:String,
        required:true
    },
    ServiceCharge:{
        type:String,
        required:true
    },
    Rating:{
        type:String,
    },
    Reviews:{
        type:String,
    },
    image: {
        public_id: {
            type: String
        },

        url: {
            type: String
        }
    }








},{timestamps:true})

const AddServiceModel = mongoose.model('Services',AddServiceSchema)

module.exports= AddServiceModel
