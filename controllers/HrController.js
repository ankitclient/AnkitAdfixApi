const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const HrModel = require('../models/Hr/HrModel');

const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "ddpqqd1op",
    api_key: "563984219451729",
    api_secret: "IrmvPIhXRVgO1WPXQ5VTjYeRum4",
});

class HrController{
    static HrRegister = async(req,res)=>{
        try {
            const { name, email, mobile, password, confirmpassword } = req.body
            const user = await HrModel.findOne({ email: email })
            if (user) {
                res.status(409).json({
                    success: true,
                    message: "Email already exist"
                })
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const register = await HrModel({
                            name: name,
                            email: email,
                            mobile: mobile,
                            password: hashpassword
                        })
                        await register.save()
                        res.status(201).json({
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
                    res.status(400).json({
                        success: true,
                        message: "All Fields Are Required"
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    static VeryfyHr = async (req, res)=>{
        try{
           // console.log(req.body)
           const {email, password} = req.body
           if(email && password){
            
            const hr = await UserRegisterModel.findOne({email:email})
            if(hr != null){

                const ismatched = await bcrypt.compare(password,hr.password)

                if(ismatched){
                    //generate jwt
                    const token = jwt.sign({id:hr._id}, 'ankityadav123')
                   // console.log(token)
                   res.cookie('token',token)
                   res.status(200).json({
                    success: true,
                    message:  "login successfully",
                    token: token,
                    hr,

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
            res.status(400).json({
                success: true,
                message:  "All fields are required"
            })

           }

        }catch(error){
            console.log(error)
        }
    }
    static Logout = async (req, res)=>{
        try{
            res.clearCookie('token')
            res.status(200).json({
                success: true,
                message: "Logout Successfuly",
                
            })
        }catch(error){
            console.log(error)
        }
    }

}
module.exports = HrController


