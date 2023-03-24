import React, { useState } from "react";
import { useNavigate } from "react-router";

import './ListingCard.css'

function ListingCard(props) {
    const navigate = useNavigate()
    const [listing, setListing] = useState(props.listing)

    function toListingHandler() {
        // in listing body, with useEffect fetch the id
        navigate("/listing/" + listing._id)
    }

    function calculateAverageRating(reviews) {
        if (reviews && reviews.length > 0) {
            const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0)
            return (totalStars / reviews.length).toFixed(2)
        } else {
            return "New"
        }
    }

    const averageRating = calculateAverageRating(listing.reviewsData.reviews)

    return (
        <div className="listingCardContainer" onClick={toListingHandler}>
            <div className="listingCardImageContainer" style={listing.imageIds.length > 0 ? {backgroundImage: "url(https://airebnb.s3.us-east-2.amazonaws.com/" + listing.imageIds[0] + ")"} : {backgroundImage: "url(../../Images/home1.jpg)"}}>
                <div className="listingCardCarouselContainer">
                    <div className="listingCardHeartContainer">
                        <i className="fa-solid fa-heart listingCardHeart"></i>
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
                        <p className="listingCardInfoReviewText">{averageRating}</p>
                    </div>
                </div>
                <div className="listingCardInfoAvailableDateContainer">
                    <p className="listingCardInfoAvailableDateText">Jun 11 - 16</p>
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
