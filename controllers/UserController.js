const UserRegisterModel = require('../models/user/UserRegisterModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class UserController{
     
    static UserRegister = async(req,res)=>{
        try{
           
            const {name,email,mobile,password,confirmpassword} = req.body
            const user = await UserRegisterModel.findOne({email:email})

            if(user){
                res.status(401).json({
                    success: true,
                    message:  "Email already exist"
                })
            }else{
                if(name && email && password && confirmpassword){
                    if(password == confirmpassword){

                        const hashpassword = await bcrypt.hash(password,10)

                        const register = await UserRegisterModel({
                            name: name,
                            email: email,
                            mobile:mobile,
                            password: hashpassword
                           
                        })
                        await register.save()
                        res.status(401).json({
                            success: true,
                            message:  "Registration successfuly",
                            register
                        })

                    }else{
                        res.status(401).json({
                            success: true,
                            message:  "password and confirmpassword does not matched"
                        })
                    }
                    
                }else{
                    res.status(401).json({
                        success: true,
                        message:  "All fields are required"
                    })

                }

            }
           
        }catch(error){
            console.log(error)
        }
    }
    
    



}
module.exports = UserController