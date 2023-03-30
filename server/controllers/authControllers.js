const mongo = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

async function userSignup (req, res, next) {
    const { firstName, lastName, email, password, about, imageId } = req.body

    let plainPassword = password
    let hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePicture: imageId,
        aboutDescription: about,
        location: {
            city: "",
            state: ""
        },
        listings: [],
        reviewsPosted: {
            reviewsPostedArray: [],
            reviewsPostedCount: 0
        },
        reviewsReceived: {
            reviewsReceivedArray: [],
            reviewsReceivedCount: 0
        },
        joinedDate: Date.now(),
        saved: []
    }

    let signupResult = await mongo.userSignup(req, res, next, createdUser)

    if (signupResult.status === 200) {
        req.body.email = email
        req.body.password = plainPassword
        await userLogin(req, res, next)
    }
      else {
        res.status(signupResult.status).json({ error: signupResult.message })
    }
}

async function userLogin (req, res, next) {
    const { email, password } = req.body

    let loginResult = await mongo.userLogin(req, res, next, email, password)
}

exports.userSignup = userSignup
exports.userLogin = userLogin
