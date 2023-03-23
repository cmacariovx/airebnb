const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')

const listingRouter = require("./routes/listingRoutes")
const authRouter = require("./routes/authRoutes")

const app = express()

app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next()
})

app.use("/listing", listingRouter)

app.use("/auth", authRouter)

app.use((req, res, next) => {
    const error = new Error("Could not find this route.")
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error)

    res.status(error.status || 500)
    res.json({"message": error.message || "Unknown error occured."})
})

app.listen(process.env.PORT || 5000)
