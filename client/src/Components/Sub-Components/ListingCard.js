import React from "react";
import { useNavigate } from "react-router";

import './ListingCard.css'

function ListingCard(props) {
    const navigate = useNavigate()

    function toListingHandler() {
        navigate("/listing/" + props._id)
    }
    return (
        <div className="listingCardContainer" onClick={toListingHandler}>
            <div className="listingCardImageContainer">
                <div className="listingCardCarouselContainer">
                    <div className="listingCardHeartContainer">
                        <i className="fa-solid fa-heart listingCardHeart"></i>
                    </div>
                    <div className="listingCardArrowsContainer">
                        <div className="listingCardArrowContainer">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>

                        <div className="listingCardArrowContainer">
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="listingCardCarouselNumberContainer">
                        {/* for every image (imagesNum) render a small circle and highlight which index/image were at */}
                    </div>
                </div>
            </div>
            <div className="listingCardInfoContainer">
                <div className="listingCardInfoLocationReviewContainer">
                    <div className="listingCardInfoLocationContainer">
                        <p className="listingCardInfoLocationText">Asheville, North Carolina</p>
                    </div>
                    <div className="listingCardInfoReviewContainer">
                        <i className="fa-solid fa-star listingCardInfoReviewStar"></i>
                        <p className="listingCardInfoReviewText">4.93</p>
                    </div>
                </div>
                <div className="listingCardInfoMilesAwayContainer">
                    <p className="listingCardInfoMilesAwayText">5 miles away</p>
                </div>
                <div className="listingCardInfoAvailableDateContainer">
                    <p className="listingCardInfoAvailableDateText">Jun 11 - 16</p>
                </div>
                <div className="listingCardInfoPriceContainer">
                    <p className="listingCardInfoPrice1Text">$380</p>
                    <p className="listingCardInfoPrice2Text">night</p>
                </div>
            </div>
        </div>
    )
}

export default ListingCard
