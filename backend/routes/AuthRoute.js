const { Signup, Login } = require('../controllers/AuthController')
const router = require('express').Router()
const {userVerification}=require("../middlewares/AuthMiddleware")


// router.post('/',userVerification)
router.post('/signup', Signup)
router.post('/login', Login)

module.exports = router