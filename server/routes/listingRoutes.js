const express = require("express")
const listingControllers = require("../controllers/listingControllers")
const checkAuth = require("../middleware/check-auth")
const fileUpload = require("../middleware/file-upload")

const router = express.Router()

router.use(checkAuth)

router.post("/create", fileUpload.fields(), listingControllers.createListing)

module.exports = router
