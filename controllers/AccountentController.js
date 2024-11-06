const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AccountentModel = require('../models/Accountent/AccountentModel')
const AddServiceModel = require('../models/Accountent/AddServiceModel');
const HowToworkModel = require('../models/Accountent/HowToWorkModel');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "ddpqqd1op",
    api_key: "563984219451729",
    api_secret: "IrmvPIhXRVgO1WPXQ5VTjYeRum4",
});

class AccountentController {
    static AccountentRegister = async (req, res) => {
        try {
            const { name, email, mobile, password, confirmpassword } = req.body
            const user = await AccountentModel.findOne({ email: email })
            if (user) {
                res.status(409).json({
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
    static VeryfyAccountent = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {

                const accountent = await AccountentModel.findOne({ email: email })
                if (accountent != null) {

                    const ismatched = await bcrypt.compare(password, accountent.password)

                    if (ismatched) {
                        //generate jwt
                        const token = jwt.sign({ id: accountent._id }, 'ankityadav123')
                        // console.log(token)
                        res.cookie('token', token)
                        res.status(200).json({
                            success: true,
                            message: "login successfully",
                            token: token,
                            accountent,

                        })
                    } else {

                        res.status(401).json({
                            success: true,
                            message: "Email or password does not matched"
                        })
                    }

                } else {
                    res.status(401).json({
                        success: true,
                        message: "You are not registered"
                    })
                }

            } else {
                res.status(400).json({
                    success: true,
                    message: "All fields are required"
                })

            }

        } catch (error) {
            console.log(error)
        }
    }
    static AddService = async (req, res) => {
        try {
            const { Category, ServiceName, ServiceDescription, ServiceCharge, Rating, Reviews } = req.body
            const file = req.files.image;
            // console.log(file)
            const serviceimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "serviceimage",
            });

            if (Category && ServiceName) {
                const InsertService = await AddServiceModel({
                    Category: Category,
                    ServiceName: ServiceName,
                    ServiceDescription: ServiceDescription,
                    ServiceCharge: ServiceCharge,
                    Rating: Rating,
                    Reviews: Reviews,
                    image: {
                        public_id: serviceimage.public_id,
                        url: serviceimage.secure_url,
                    },
                })
                await InsertService.save()
                res.status(201).json({
                    success: true,
                    message: "Services Add successfuly",
                    InsertService
                })
            } else {
                res.status(400).json({
                    success: true,
                    message: "Category and Service Name Fields Are Required"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    static DisplayServices = async (req, res) => {
        try {
            const services = await AddServiceModel.find()
            res.status(200).json({
                success: true,
                services
            })
        } catch (error) {
            console.log(error)
        }
    }
    static DisplayCategoryWise = async (req, res) => {
        try {
            const Category  = req.params.id
            const services = await AddServiceModel.find({Category:Category})
            res.status(200).json({
                success: true,
                services
            })
        } catch (error) {
            console.log(error)
        }
    }
    static ViewService = async (req, res) => {
        try {
            const servicedetails = await AddServiceModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                servicedetails
            })

        } catch (error) {
            console.log(error)
        }
    }
    static UpdateService = async (req, res) => {
        try{
            const servicedata = await AddServiceModel.findById(req.params.id)
            const imgId = servicedata.image.public_id
            await cloudinary.uploader.destroy(imgId)

            const file = req.files.image;
            // console.log(file)
            const serviceimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "serviceimage",
            });

            const { Category, ServiceName, ServiceDescription, ServiceCharge, Rating, Reviews } = req.body
            
            const result = await AddServiceModel.findByIdAndUpdate(req.params.id,{
                Category: Category,
                ServiceName: ServiceName,
                ServiceDescription: ServiceDescription,
                ServiceCharge: ServiceCharge,
                Rating: Rating,
                Reviews: Reviews,
                image: {
                    public_id: serviceimage.public_id,
                    url: serviceimage.secure_url,
                },
            })
            await result.save()
                res.status(201).json({
                    success: true,
                    message: "Service Update successfuly",
                    result
                })
            
        }catch(error){
            console.log(error)
        }
    }
    static ServiceDelete = async (req, res) => {
        try {
            await AddServiceModel.findByIdAndDelete(req.params.id)
            res.status(200).json({
                success: true,
                message: "delete successful"
            })
        } catch (error) {
            console.log(error)
        }
    }
    static HowToWorkInsert = async(req,res)=>{
        try {
            const { Category, ServiceName, Title, Description} = req.body
            const file = req.files.image;
            // console.log(file)
            const Htwimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "serviceimage",
            });

            if (Category && ServiceName && file && Title && Description) {
                const InsertHTW = await HowToworkModel({
                    Category: Category,
                    ServiceName: ServiceName,
                    Title: Title,
                    Description: Description,
                    image: {
                        public_id: Htwimage.public_id,
                        url: Htwimage.secure_url,
                    },
                })
                await InsertHTW.save()
                res.status(201).json({
                    success: true,
                    message: "How to work Add successfuly",
                    InsertService
                })
            } else {
                res.status(400).json({
                    success: true,
                    message: "All Fields Are Required"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = AccountentController