const jwt = require('jsonwebtoken')
const UserRegisterModel = require('../models/user/UserRegisterModel')
const User_auth = async  (req,res,next)=>{
    try{
        //console.log('hello user')
    const {token} = req.cookies
    //console.log(token)
    const verify_token = jwt.verify(token,'ankityadav123')
    //console.log(verify_token)
    const user_data = await UserRegisterModel.findOne({_id: verify_token.id})
    //console.log(user_data)
    req.user = user_data
    next()

    }catch(error){
        res.status(401).json({
                    success: true,
                    message: "unauthorizes user"
                })
    }
    
}
module.exports = User_auth