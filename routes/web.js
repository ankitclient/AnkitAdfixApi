const express = require('express')
const UserController = require('../controllers/UserController')
const AccountentController = require('../controllers/AccountentController')
const router = express.Router()

// user controller
router.post('/register',UserController.UserRegister)
router.post('/veryfyLogin',UserController.VeryfyLogin)
router.get('/logout',UserController.Logout)


//AccountentController
router.post('/accountentRegister',AccountentController.AccountentRegister)
router.post('/addservice',AccountentController.AddService)
router.get('/displayservices',AccountentController.DisplayServices)
router.get('/servicedetails/:id',AccountentController.ViewService)




module.exports = router