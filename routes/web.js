const express = require('express')
const UserController = require('../controllers/UserController')
const AccountentController = require('../controllers/AccountentController')
const TechnicianController = require('../controllers/TechnicianController')
const AdminController = require('../controllers/AdminContorller')
const HrController = require('../controllers/HrController')
const CrmController = require('../controllers/CrmController')
const auth = require('../middleware/auth')
const router = express.Router()

// user controller
router.post('/register',UserController.UserRegister)
router.post('/veryfyLogin',UserController.VeryfyLogin)
router.get('/logout',UserController.Logout)

// Tchnician Controller
router.post('/technicianregister',TechnicianController.RegisterTechnician)
router.post('/technicianveryfy',TechnicianController.TechnicianVeryfy)



//AccountentController
router.post('/accountentRegister',AccountentController.AccountentRegister)
router.post('/veryfyaccountent',AccountentController.VeryfyAccountent)
router.post('/addservice',AccountentController.AddService)
router.get('/displayservices',AccountentController.DisplayServices)
router.get('/servicedetails/:id',AccountentController.ViewService)
router.post('/updateservice/:id',AccountentController.UpdateService)
router.get('/servicedelete/:id',AccountentController.ServiceDelete)

//AdminController
router.post('/adminregister',AdminController.AdminRegister)
router.post('/veryfyadmin',AdminController.Veryfyadmin)

//Hr Controller
router.post('/hrregister',HrController.HrRegister)
router.post('/veryfyhr',HrController.VeryfyHr)


//CrmController
router.post('/crmregister',CrmController.CrmRegister)
router.post('/veryfycrm',CrmController.VeryfyCrm)


module.exports = router