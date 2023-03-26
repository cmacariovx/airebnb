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
            jwtSecret
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

async function createListing(req, res, next, listingData) {
    const client = new MongoClient(mongoUrl)

    try {
        await client.connect()
        const db = client.db("airebnb")

        let result = await db.collection("listings").insertOne(listingData)

        client.close()

        res.status(200).json({ message: "Listing created successfully." })
    }
    catch (error) {
        res.status(500).json({ message: "Sorry! Could not create listing, please try again." })
    }
}

async function fetchListings(req, res, next) {
    const client = new MongoClient(mongoUrl)
    const { page } = req.body
    const listingsPerPage = 20

    try {
        await client.connect()
        const db = client.db("airebnb")

        let result = await db.collection("listings")
            .find()
            .skip(page * listingsPerPage)
            .limit(listingsPerPage)
            .toArray()

        const allReviewIds = result.flatMap(listing => listing.reviewsData.reviews.map(id => new ObjectId(id)))

        const allReviews = await db.collection("reviews").find({_id: {$in: allReviewIds}}).toArray()

        result = result.map(listing => {
            const listingReviews = allReviews.filter(review => listing.reviewsData.reviews.some(id => id.toString() === review._id.toString()))
            return {
                ...listing,
                reviewsData: {
                    ...listing.reviewsData,
                    reviews: listingReviews
                }
            }
        })

        client.close()

        res.status(200).json({ message: "Listings fetched successfully.", listings: result })
    }
    catch (error) {
        res.status(500).json({ error: "Sorry! Could not fetch listings, please try again." })
    }
}

async function fetchListing(req, res, next) {
    const client = new MongoClient(mongoUrl)
    const { listingId } = req.body

    try {
        await client.connect()
        const db = client.db("airebnb")

        let result = await db.collection("listings").findOne({_id: new ObjectId(listingId)})

        if (result) {
            const reviewIds = result.reviewsData.reviews.map(id => new ObjectId(id))
            const reviews = await db.collection("reviews").find({_id: {$in: reviewIds}}).toArray()

            result.reviewsData.reviews = reviews
        }

        client.close()

        res.status(200).json({ message: "Listings fetched successfully.", listing: result })
    }
    catch (error) {
        res.status(500).json({ error: "Sorry! Could not fetch listings, please try again." })
    }
}

async function fetchHost(req, res, next) {
    const client = new MongoClient(mongoUrl)
    const { hostId } = req.body

    try {
        await client.connect()
        const db = client.db("airebnb")

        let result = await db.collection("users").findOne({_id: new ObjectId(hostId)})

        client.close()

        res.status(200).json({ message: "Host fetched successfully.", host: result })
    }
    catch (error) {
        res.status(500).json({ error: "Sorry! Could not fetch host, please try again." })
    }
}

async function bookReservation(req, res, next) {
    const client = new MongoClient(mongoUrl)
    const { listingId, userId, userFirstName, userLastName, startDate, endDate } = req.body

    try {
        await client.connect()
        const collection = client.db("airebnb").collection("listings")

        const validationResult = await validateBooking(
            listingId,
            new Date(startDate),
            new Date(endDate)
        )

        if (validationResult.error) {
            res.status(400).json({ error: validationResult.error })
            return
        }

        const newBooking = {
            userId,
            userFirstName,
            userLastName,
            startDate,
            endDate,
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(listingId) },
            { $push: { bookings: newBooking } }
        )

        if (result.modifiedCount === 1) {
            res.status(200).json({ success: true, message: result })
        }
        else {
            throw new Error("Error adding the booking.")
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: error.message } })
    }
    finally {
        await client.close()
    }
}

const validateBooking = async (listingId, startDate, endDate) => {
    const client = new MongoClient(mongoUrl)

    try {
        await client.connect()
        const collection = client.db("airebnb").collection("listings")

        const listing = await collection.findOne({ _id: new ObjectId(listingId) })

        if (!listing) {
            throw new Error("Listing not found.")
        }

        const bookings = listing.bookings || []

        for (const booking of bookings) {
            const bookedStartDate = new Date(booking.startDate)
            const bookedEndDate = new Date(booking.endDate)

            if (
                (startDate >= bookedStartDate && startDate <= bookedEndDate) ||
                (endDate >= bookedStartDate && endDate <= bookedEndDate) ||
                (startDate <= bookedStartDate && endDate >= bookedEndDate)
            ) {
                throw new Error("Overlapping booking dates.")
            }
        }
    }
    catch (error) {
        console.error(error)
        return { error: { message: error.message } }
    }
    finally {
        await client.close()
    }
}

async function fetchPersonalListings(req, res, next) {
    const { userId } = req.body

    const client = new MongoClient(mongoUrl)

    try {
        await client.connect()
        const db = client.db("airebnb")

        const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })

        if (!user) {
            throw new Error("User not found.")
        }

        const listingIds = user.listings.map(id => new ObjectId(id))

        let listings = await db.collection("listings").find({ _id: { $in: listingIds } }).toArray()

        for (let listing of listings) {
            const reviewIds = listing.reviewsData.reviews.map(id => new ObjectId(id))
            const reviews = await db.collection("reviews").find({ _id: { $in: reviewIds } }).toArray()
            listing.reviewsData.reviews = reviews
        }

        user.listings = listings

        client.close()

        res.status(200).json({ message: "Listings fetched successfully.", user: user })
    }
    catch (error) {
        client.close()
        res.status(500).json({ error: { message: error.message } })
    }
}


exports.userSignup = userSignup
exports.userLogin = userLogin
exports.createListing = createListing
exports.fetchListings = fetchListings
exports.fetchListing = fetchListing
exports.fetchHost = fetchHost
exports.bookReservation = bookReservation
exports.validateBooking = validateBooking
exports.fetchPersonalListings = fetchPersonalListings
