const mongoose = require('mongoose')

const HowtoWorkSchema = mongoose.Schema({
    ServiceName: {
        type: String, required: true
    },
    ServicesCategory: {
        type: String, required: true
    },
    HToWorks: [
        {
            title: {
                type: String, required: true
            },
            description: {
                type: String, required: true
            },
            image: {
                public_id: {
                    type: String, required: true
                },
                url: {
                    type: String, required: true
                },
            },
        },
    ],

}, { timestamps: true })

const HowToworkModel = mongoose.model('ServiceHowToWork', HowtoWorkSchema)

module.exports = HowToworkModel
