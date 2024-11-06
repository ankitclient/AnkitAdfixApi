const mongoose = require('mongoose')

const HowtoWorkSchema = mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    ServiceName:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Description:{
        type: String,
        required:true
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

const HowToworkModel = mongoose.model('ServiceHowToWork',HowtoWorkSchema)

module.exports = HowToworkModel
