import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import './ProfileListingCard.css'
import homePic from '../../Images/home1.jpg'

function ProfileListingCard(props) {
    const [listing, setListing] = useState(props.listing)
    const [reviews, setReviews] = useState(props.listing.reviewsData.reviews)
    const [averageRating, setAverageRating] = useState(null)
    const [averageRatings, setAverageRatings] = useState(null)

    const navigate = useNavigate()

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
    }, [reviews])

    function toListingBody() {
        navigate("/listing/" + listing._id)
    }

    return (
        <div className="profileListingCardContainer" onClick={toListingBody} style={props.single ? {width: "100%"} : {width: "47%"}}>
            <img src={"https://airebnb.s3.us-east-2.amazonaws.com/" + listing.imageIds[0]} className="profileListingCardPic"/>
            <div className="profileListingInfoContainer">
                <div className="profileListingReviewsContainer">
                    <i className="fa-solid fa-star profileListingReviewsStar"></i>
                    <p className="profileListingReviewsText">{averageRating ? averageRating : "New"}</p>
                    <p className="profileListingReviewsNumText">{"(" + listing.reviewsData.reviewsCount + ")"}</p>
                </div>
                <p className="profileListingTitle">{listing.placeGeneralData.placeTitle}</p>
            </div>
        </div>
    )
}

export default ProfileListingCard
