import React, { useState, useEffect, useContext, useRef, forwardRef } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Auth-Context";

import ErrorModal from "./ErrorModal";
import './ListingCard.css'

const ListingCard = forwardRef((props, ref) => {
    const navigate = useNavigate()
    const [listing, setListing] = useState(props.listing)
    const [averageRating, setAverageRating] = useState(null)
    const [averageRatings, setAverageRatings] = useState(null)
    const [reviews, setReviews] = useState(props.listing.reviewsData.reviews)
    const [nearestAvailableDate, setNearestAvailableDate] = useState(null)
    const [isSaved, setIsSaved] = useState(props.isSaved ? props.isSaved : null)

    const auth = useContext(AuthContext)

    function toListingHandler() {
        navigate("/listing/" + listing._id)
    }

    function calculateAverageRatings(reviews) {
        if (reviews.length === 0) {
            return {
                cleanlinessRating: 0,
                accuracyRating: 0,
                communicationRating: 0,
                locationRating: 0,
                checkInRating: 0,
                valueRating: 0,
            }
        }

        const sumRatings = reviews.reduce(
            (sum, review) => ({
                cleanlinessRating: sum.cleanlinessRating + review.cleanlinessRating,
                accuracyRating: sum.accuracyRating + review.accuracyRating,
                communicationRating: sum.communicationRating + review.communicationRating,
                locationRating: sum.locationRating + review.locationRating,
                checkInRating: sum.checkInRating + review.checkInRating,
                valueRating: sum.valueRating + review.valueRating,
            }),
            {
                cleanlinessRating: 0,
                accuracyRating: 0,
                communicationRating: 0,
                locationRating: 0,
                checkInRating: 0,
                valueRating: 0,
            }
        )

        const averageRatings = {
            cleanlinessRating: (sumRatings.cleanlinessRating / reviews.length).toFixed(1),
            accuracyRating: (sumRatings.accuracyRating / reviews.length).toFixed(1),
            communicationRating: (sumRatings.communicationRating / reviews.length).toFixed(1),
            locationRating: (sumRatings.locationRating / reviews.length).toFixed(1),
            checkInRating: (sumRatings.checkInRating / reviews.length).toFixed(1),
            valueRating: (sumRatings.valueRating / reviews.length).toFixed(1),
        }

        return averageRatings
    }

    function calculateAverageRating(reviews) {
        if (reviews && reviews.length > 0) {
            let averageRatings = calculateAverageRatings(reviews)
            setAverageRatings(averageRatings)
            const totalStars =
                parseFloat(averageRatings.cleanlinessRating) +
                parseFloat(averageRatings.accuracyRating) +
                parseFloat(averageRatings.communicationRating) +
                parseFloat(averageRatings.locationRating) +
                parseFloat(averageRatings.checkInRating) +
                parseFloat(averageRatings.valueRating)

            const overallRating = (totalStars / 6).toFixed(2)
            return overallRating
        }
        else return "New"
    }

    useEffect(() => {
        if (reviews.length > 0) setAverageRating(calculateAverageRating(reviews))
        const nearestBookingDates = findNearestAvailableDates(listing, 3, 7)
        if (listing) setNearestAvailableDate(formatDateRange(nearestBookingDates.startDate, nearestBookingDates.endDate))
    }, [listing, reviews])

    function findNearestAvailableDates(listing, minDays, maxDays) {
        const bookings = listing.bookings
        const today = new Date()
        const maxSearchDate = new Date(today)
        maxSearchDate.setDate(maxSearchDate.getDate() + 90)

        let startDate = new Date(today)
        startDate.setDate(startDate.getDate() + minDays)

        while (startDate <= maxSearchDate) {
            const endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() + maxDays - minDays)

            const isAvailable = !bookings.some((booking) => {
                const bookedStartDate = new Date(booking.startDate)
                const bookedEndDate = new Date(booking.endDate)

                return (
                    (startDate >= bookedStartDate && startDate <= bookedEndDate) ||
                    (endDate >= bookedStartDate && endDate <= bookedEndDate) ||
                    (startDate <= bookedStartDate && endDate >= bookedEndDate)
                )
            })

            if (isAvailable) {
                return { startDate, endDate }
            }

            startDate.setDate(startDate.getDate() + 1)
        }

        return { startDate: null, endDate: null }
    }

    function formatDateRange(startDate, endDate) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        const startMonth = monthNames[startDate.getMonth()]
        const startDay = startDate.getDate()
        const endDay = endDate.getDate()

        return `${startMonth} ${startDay} - ${endDay}`
    }

    const debounceTimer = useRef(null)

    async function createSave() {
        const response = await fetch("http://localhost:5000/" + "listing/createSave", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId,
                listingId: listing._id.toString()
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    async function unsave() {
        const response = await fetch("http://localhost:5000/" + "listing/unsave", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId,
                listingId: listing._id.toString()
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()
        return data
    }

    function handleSave() {
        if (auth.token) {
            setIsSaved((prevIsSaved) => !prevIsSaved)

            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current)
            }

            debounceTimer.current = setTimeout(() => {
                if (isSaved) {
                    unsave()
                }
                else {
                    createSave()
                }
            }, 500)
        }
        else props.authCheck()
    }

    return (
        <div className="listingCardContainer" onClick={toListingHandler} ref={ref}>
            <div className="listingCardImageContainer" style={listing.imageIds.length > 0 ? {backgroundImage: "url(https://airebnb.s3.us-east-2.amazonaws.com/" + listing.imageIds[0] + ")"} : {backgroundImage: "url(../../Images/home1.jpg)"}}>
                <div className="listingCardCarouselContainer">
                    <div className="listingCardHeartContainer">
                    <i className={`fa-solid fa-heart listingCardHeart ${isSaved ? "saved" : ""}`} onClick={(e) => {e.stopPropagation(); handleSave();}}></i>
                    </div>
                </div>
            </div>
            <div className="listingCardInfoContainer">
                <div className="listingCardInfoTitleContainer">
                    <p className="listingCardInfoTitleText">{listing.placeGeneralData.placeTitle}</p>
                </div>
                <div className="listingCardInfoLocationReviewContainer">
                    <div className="listingCardInfoLocationContainer">
                        <p className="listingCardInfoLocationText">{[listing.placeLocationData.placeCity, ", ", listing.placeLocationData.placeState]}</p>
                    </div>
                    <div className="listingCardInfoReviewContainer">
                        <i className="fa-solid fa-star listingCardInfoReviewStar"></i>
                        <p className="listingCardInfoReviewText">{averageRating ? averageRating : "New"}</p>
                    </div>
                </div>
                <div className="listingCardInfoAvailableDateContainer">
                    <p className="listingCardInfoAvailableDateText">{nearestAvailableDate}</p>
                </div>
                <div className="listingCardInfoPriceContainer">
                    <p className="listingCardInfoPrice1Text">{"$" + listing.placePriceData.priceCounter}</p>
                    <p className="listingCardInfoPrice2Text">night</p>
                </div>
            </div>
        </div>
    )
})

export default ListingCard
