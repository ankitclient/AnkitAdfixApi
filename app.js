const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectdb = require('./db/connectdb')
const web = require('./routes/web')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload");



app.use(express.urlencoded({ extended: false }))
// file uploader
app.use(fileUpload({ useTempFiles: true }));


app.use(cookieParser())
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