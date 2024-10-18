const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AccountentModel = require('../models/Accountent/AccountentModel')
const AddServiceModel = require('../models/Accountent/AddServiceModel')


class AccountentController{

    static AccountentRegister = async(req,res)=>{
        try {

            const { name, email, mobile, password, confirmpassword } = req.body
            const user = await AccountentModel.findOne({ email: email })

            if (user) {
                res.status(401).json({
                    success: true,
                    message: "Email already exist"
                })
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {

                        const hashpassword = await bcrypt.hash(password, 10)

                        const register = await AccountentModel({
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
    static AddService = async(req,res)=>{
        try{
            const {Category, ServiceName, ServiceDescription, ServiceCharge} = req.body
                
            if(Category && ServiceName){
                const InsertService = await AddServiceModel({
                    Category:Category,
                    ServiceName:ServiceName,
                    ServiceDescription:ServiceDescription,
                    ServiceCharge:ServiceCharge

                })
                await InsertService.save()
                        res.status(401).json({
                            success: true,
                            message: "Product Add successfuly",
                            InsertService
                        })

            }else{
                res.status(401).json({
                    success:true,
                    message:"Category and Service Name Fields Are Required"
                })
            }


        }catch(error){
            console.log(error)
        }
    }



}
module.exports = AccountentController