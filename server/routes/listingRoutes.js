const express = require("express")

const listingControllers = require("../controllers/listingControllers")
const checkAuth = require("../middleware/check-auth")

const router = express.Router()

// router.use(checkAuth)

// router.post("/fetchProfilePosts", profileControllers.fetchProfilePosts)

module.exports = router
