const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

// user controller
router.post('/register',UserController.UserRegister)
router.post('/veryfyLogin',UserController.VeryfyLogin)
router.get('/logout',UserController.Logout)





module.exports = router