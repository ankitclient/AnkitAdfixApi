const UserRegisterModel = require('../models/user/UserRegisterModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class UserController {

    static UserRegister = async (req, res) => {
        try {

            const { name, email, mobile, password, confirmpassword } = req.body
            const user = await UserRegisterModel.findOne({ email: email })

            if (user) {
                res.status(409).json({
                    success: true,
                    message: "Email already exist"
                })
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {

                        const hashpassword = await bcrypt.hash(password, 10)

                        const register = await UserRegisterModel({
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

    static VeryfyLogin = async (req, res)=>{
        try{
           // console.log(req.body)
           const {email, password} = req.body
           if(email && password){
            
            const user = await UserRegisterModel.findOne({email:email})
            if(user != null){

                const ismatched = await bcrypt.compare(password,user.password)

                if(ismatched){
                    //generate jwt
                    const token = jwt.sign({id:user._id}, 'ankityadav123')
                   // console.log(token)
                   res.cookie('token',token)
                   res.status(200).json({
                    success: true,
                    message:  "login successfully",
                    token: token,
                    user,

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
module.exports = UserController