const mongoose = require('mongoose')

const connectdb = ()=>{
    return mongoose.connect(process.env.LIVE_URL,{
       


        
    }).then((data)=>{
        console.log(`mongodb connected with server:${data.connection.host}`)
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports = connectdb