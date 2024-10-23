const jwt = require('jsonwebtoken')
const UserRegisterModel = require('../models/user/UserRegisterModel')
const TechnicianModel = require('../models/Technician/TechnicianModel')
const User_auth = async (req, res, next) => {
    try {
        //console.log('hello user')
        const { token } = req.cookies
        //console.log(token)
        const verify_user = jwt.verify(token, 'ankityadav123')
        const verify_technician = jwt.verify(token, 'technician123')
        //console.log(verify_token)
        if (verify_user != null) {
            const user_data = await UserRegisterModel.findOne({ _id: verify_user.id })
            //console.log(user_data)
            req.user = user_data
            next()

        }else {
            if(verify_technician != null){
                const technician_data = await TechnicianModel.findOne({ _id: verify_technician.id })
            //console.log(user_data)
            req.technician = technician_data
            next()
            }else{
                res.status(401).json({
                    success: true,
                    message: "unauthorizes user"
                })
            }
            
        }

    } catch (error) {
        res.status(401).json({
            success: true,
            message: "unauthorizes user"
        })
    }

}
module.exports = User_auth