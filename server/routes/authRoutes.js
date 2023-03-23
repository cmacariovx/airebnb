const express = require("express")
const authControllers = require('../controllers/authControllers')
const fileUpload = require("../middleware/file-upload")

const router = express.Router()

router.post('/signup', fileUpload.single('image'), authControllers.userSignup)

router.post('/login', authControllers.userLogin)

module.exports = router
