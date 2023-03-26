const express = require("express")
const listingControllers = require("../controllers/listingControllers")
const checkAuth = require("../middleware/check-auth")
const fileUpload = require("../middleware/file-upload")

const router = express.Router()

router.post("/fetch", listingControllers.fetchListings)

router.post("/fetchSingle", listingControllers.fetchListing)

router.post("/fetchHost", listingControllers.fetchHost)

router.use(checkAuth)

router.post("/create", fileUpload.fields(), listingControllers.createListing)

router.post("/bookReservation", listingControllers.bookReservation)


module.exports = router
