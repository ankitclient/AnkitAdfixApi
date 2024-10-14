const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectdb = require('./db/connectdb')
const web = require('./routes/web')
const cors = require('cors')



app.use(cors())
app.use(express.json())

dotenv.config({
    path:'.env'
})
connectdb()
app.use('/',web)











app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})