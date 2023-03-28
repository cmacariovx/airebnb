const express = require("express")
const listingControllers = require("../controllers/listingControllers")
const checkAuth = require("../middleware/check-auth")
const fileUpload = require("../middleware/file-upload")

const router = express.Router()

router.post("/fetch", listingControllers.fetchListings)

router.post("/fetchSingle", listingControllers.fetchListing)

router.post("/fetchHost", listingControllers.fetchHost)

router.post("/fetchUser", listingControllers.fetchUser)

router.post("/searchListings", listingControllers.searchListings)

router.use(checkAuth)

router.post("/create", fileUpload.fields(), listingControllers.createListing)

router.post("/bookReservation", listingControllers.bookReservation)

router.post("/fetchPersonalListings", listingControllers.fetchPersonalListings)

router.post("/fetchSavedListings", listingControllers.fetchSavedListings)

router.post("/createReview", listingControllers.createReview)

router.post("/createSave", listingControllers.createSave)

router.post("/unsave", listingControllers.unsave)

module.exports = router
