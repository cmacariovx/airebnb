import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import './ListingCard.css'

function ListingCard(props) {
    const navigate = useNavigate()
    const [listing, setListing] = useState(props.listing)
    const [averageRating, setAverageRating] = useState(null)
    const [averageRatings, setAverageRatings] = useState(null)
    const [reviews, setReviews] = useState(props.listing.reviewsData.reviews)
    const [nearestAvailableDate, setNearestAvailableDate] = useState(null)

    function toListingHandler() {
        // in listing body, with useEffect fetch the id
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

        return {startDate: null, endDate: null}
    }

    function formatDateRange(startDate, endDate) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        const startMonth = monthNames[startDate.getMonth()]
        const startDay = startDate.getDate()
        const endDay = endDate.getDate()

        return `${startMonth} ${startDay} - ${endDay}`
    }

    return (
        <div className="listingCardContainer" onClick={toListingHandler}>
            <div className="listingCardImageContainer" style={listing.imageIds.length > 0 ? {backgroundImage: "url(https://airebnb.s3.us-east-2.amazonaws.com/" + listing.imageIds[0] + ")"} : {backgroundImage: "url(../../Images/home1.jpg)"}}>
                <div className="listingCardCarouselContainer">
                    <div className="listingCardHeartContainer">
                        <i className="fa-solid fa-heart listingCardHeart" onClick={(e) => e.stopPropagation()}></i>
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
}

export default ListingCard
