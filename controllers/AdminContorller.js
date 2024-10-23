const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/Admin/AdminModel');
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "ddpqqd1op",
    api_key: "563984219451729",
    api_secret: "IrmvPIhXRVgO1WPXQ5VTjYeRum4",
});

class AdminController{

    static AdminRegister = async(req,res)=>{
        try {
            const { name, email, mobile, password, confirmpassword } = req.body
            const admin = await AdminModel.findOne({ email: email })
            if (admin) {
                res.status(401).json({
                    success: true,
                    message: "Email already exist"
                })
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const register = await AdminModel({
                            name: name,
                            email: email,
                            mobile: mobile,
                            password: hashpassword
                        })
                        await register.save()
                        res.status(401).json({
                            success: true,
                            message: "Registration successfuly",
                            register
                        })
                    } else {
                        res.status(401).json({
                            success: true,
                            message: "password and confirmpassword does not matched"
                        })
                    }
                } else {
                    res.status(401).json({
                        success: true,
                        message: "All Fields Are Required"
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    static Veryfyadmin = async (req, res)=>{
        try{
           // console.log(req.body)
           const {email, password} = req.body
           if(email && password){
            
            const admin = await AdminModel.findOne({email:email})
            if(admin != null){

                const ismatched = await bcrypt.compare(password,admin.password)

                if(ismatched){
                    //generate jwt
                    const token = jwt.sign({id:admin._id}, 'ankityadav123')
                   // console.log(token)
                   res.cookie('token',token)
                   res.status(200).json({
                    success: true,
                    message:  "login successfully",
                    token: token,
                    admin,

                })
                }else{

                    res.status(401).json({
                        success: true,
                        message:  "Email or password does not matched"
                    })
                }

            }else{
                res.status(401).json({
                    success: true,
                    message:  "You are not registered"
                })
            }

           }else{
            res.status(401).json({
                success: true,
                message:  "All fields are required"
            })

           }

        }catch(error){
            console.log(error)
        }
    }

}
module.exports = AdminController