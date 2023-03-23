const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require("dotenv").config()

const mongoUrl = process.env.MONGO_URL
const jwtSecret = process.env.JWT_SECRET

async function userSignup (req, res, next, newUser) {
    const client = new MongoClient(mongoUrl)
    let result
    let existingUser
    try {
        await client.connect()
        const db = client.db("airebnb")
        existingUser = await db.collection("users").findOne({ "email": newUser.email })

        if (existingUser) {
            client.close()
            return { status: 409, message: "Email already exists." }
        }

        result = await db.collection("users").insertOne(newUser)

        client.close()

        return { status: 200, message: "User created successfully." }
    }
    catch (error) {
        return { status: 500, message: "Sorry! Could not add user, please try again." }
    }
}

async function userLogin(req, res, next, email, password) {
    const client = new MongoClient(mongoUrl)

    try {
        await client.connect()
        const db = client.db('airebnb')
        const user = await db.collection('users').findOne({ email })

        if (!user) {
            client.close()
            return res.status(401).json({ error: 'Invalid credentials.' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            client.close()
            return res.status(401).json({ error: 'Invalid credentials.' })
        }

        const token = jwt.sign(
            { userId: user._id.toString(), email: user.email },
            jwtSecret,
            { expiresIn: '24h' }
        )

        client.close()
        return res.status(200).json({
            userId: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            token,
            email: user.email,
            profilePicture: user.profilePicture,
        })
    }
    catch (error) {
        client.close()
        return res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
}

exports.userSignup = userSignup
exports.userLogin = userLogin
