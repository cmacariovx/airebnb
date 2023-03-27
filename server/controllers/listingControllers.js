const mongo = require('../mongo')
require("dotenv").config()

async function createListing (req, res, next) {
    const placeGeneralData = JSON.parse(req.body.placeGeneralData)
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
        bookings: []
    }

    let createListingResult = await mongo.createListing(req, res, next, listingData)
}

async function fetchListings(req, res, next) {
    let fetchListingResult = await mongo.fetchListings(req, res, next)
}

async function fetchListing(req, res, next) {
    let fetchListingResult = await mongo.fetchListing(req, res, next)
}

async function fetchHost(req, res, next) {
    let fetchHostResult = await mongo.fetchHost(req, res, next)
}

async function bookReservation(req, res, next) {
    let bookReservationResult = await mongo.bookReservation(req, res, next)
}

async function fetchPersonalListings(req, res, next) {
    let fetchPersonalListingsResult = await mongo.fetchPersonalListings(req, res, next)
}

async function createReview(req, res, next) {
    let createReviewResult = await mongo.createReview(req, res, next)
}

async function fetchUser(req, res, next) {
    let fetchUserResult = await mongo.fetchUser(req, res, next)
}

async function searchListings(req, res, next) {
    let searchListingResult = await mongo.searchListings(req, res, next)
}

exports.createListing = createListing
exports.fetchListings = fetchListings
exports.fetchListing = fetchListing
exports.fetchHost = fetchHost
exports.bookReservation = bookReservation
exports.fetchPersonalListings = fetchPersonalListings
exports.createReview = createReview
exports.fetchUser = fetchUser
exports.searchListings = searchListings
