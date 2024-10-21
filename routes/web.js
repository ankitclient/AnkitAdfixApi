const express = require('express')
const UserController = require('../controllers/UserController')
const AccountentController = require('../controllers/AccountentController')
const TechnicianController = require('../controllers/TechnicianController')
const AdminController = require('../controllers/AdminContorller')
const HrController = require('../controllers/HrController')
const CrmController = require('../controllers/CrmController')
const router = express.Router()

// user controller
router.post('/register',UserController.UserRegister)
router.post('/veryfyLogin',UserController.VeryfyLogin)
router.get('/logout',UserController.Logout)

// Tchnician Controller
router.post('/technicianregister',TechnicianController.RegisterTechnician)



//AccountentController
router.post('/accountentRegister',AccountentController.AccountentRegister)
router.post('/addservice',AccountentController.AddService)
router.get('/displayservices',AccountentController.DisplayServices)
router.get('/servicedetails/:id',AccountentController.ViewService)
router.get('/servicedelete/:id',AccountentController.ServiceDelete)

//AdminController
router.post('/adminregister',AdminController.AdminRegister)

//Hr Controller
router.post('/hrregister',HrController.HrRegister)


//CrmController
router.post('/crmregister',CrmController.CrmRegister)


module.exports = router