const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TechnicianModel = require('../models/Technician/TechnicianModel')
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "ddpqqd1op",
    api_key: "563984219451729",
    api_secret: "IrmvPIhXRVgO1WPXQ5VTjYeRum4",
});


class TechnicianController{
    
    static RegisterTechnician = async(req, res)=>{
        try {
            const { name, email, mobile,age, password,work, workingtime,confirmpassword } = req.body
            const technician = await TechnicianModel.findOne({ email: email })
            if (technician) {
                res.status(409).json({
                    success: true,
                    message: "Email already exist"
                })
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const register = await TechnicianModel({
                            name: name,
                            email: email,
                            mobile: mobile,
                            age:age,
                            password:hashpassword,
                            work:work,
                            workingtime:workingtime
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
    static TechnicianVeryfy = async (req, res)=>{
        try{
           // console.log(req.body)
           const {email, password} = req.body
           if(email && password){
            
            const technician = await TechnicianModel.findOne({email:email})
            if(technician != null){

                const ismatched = await bcrypt.compare(password,technician.password)

                if(ismatched){
                    //generate jwt
                    const token = jwt.sign({id:technician._id}, 'technician123')
                   // console.log(token)
                   res.cookie('token',token)
                   res.status(200).json({
                    success: true,
                    message:  "login successfully",
                    token: token,
                    technician,

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






}
module.exports = TechnicianController 