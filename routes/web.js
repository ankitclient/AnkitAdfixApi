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




module.exports = router