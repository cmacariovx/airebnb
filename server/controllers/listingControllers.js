const mongo = require('../mongo')
require("dotenv").config()

async function createListing (req, res, next) {
    const placeGeneralData = JSON.parse(req.body.placeGeneralData)
    const bookings= JSON.parse(req.body.bookings)
    const placePriceData = JSON.parse(req.body.placePriceData)
    const placeMaxData = JSON.parse(req.body.placeMaxData)
    const placeLocationData = JSON.parse(req.body.placeLocationData)
    const placeAmenitiesData = JSON.parse(req.body.placeAmenitiesData)
    const reviewsData = JSON.parse(req.body.reviewsData)

    const imageIds = []

    for (let i = 0; i < 5; i++) {
        const imageId = req.body[`imageId${i}`]
        imageIds.push(imageId)
    }

    const listingData = {
        placeGeneralData,
        placePriceData,
        placeMaxData,
        placeLocationData,
        placeAmenitiesData,
        reviewsData,
        imageIds,
        bookings
    }

    let createListingResult = await mongo.createListing(req, res, next, listingData)
}

async function fetchListings(req, res, next) {
    let fetchListingResult = await mongo.fetchListings(req, res, next)
}

exports.createListing = createListing
exports.fetchListings = fetchListings
