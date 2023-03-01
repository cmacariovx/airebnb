import React from "react";

import './ListingBody.css'

import homePic from '../../Images/home1.jpg'
import personalPic from '../../Images/personalPic.jpg'
import aircoverLogo from '../../Images/aircover.png'
import Calendar from "./Calendar";

function ListingBody() {
    return (
        <div className="listingBodyContainer">
            <div className="listingBodyIntroContainer">
                <div className="listingBodyTitleContainer">
                    <p className="listingBodyTitleText">Modern Mansion</p>
                </div>
                <div className="listingBodyInfoContainer">
                    <div className="listingBodyInfoContainerLeft">
                        <div className="listingBodyReviewContainer">
                            <i className="fa-solid fa-star listingBodyStar"></i>
                            <p className="listingBodyReviewText">4.93</p>
                        </div>
                        <p className="listingBodyDotText">•</p>
                        <a className="listingBodyReviewCountText">653 reviews</a>
                        <p className="listingBodyDotText">•</p>
                        <a className="listingBodyLocationText">Asheville, North Carolina</a>
                    </div>
                    <div className="listingBodyInfoContainerRight">
                        <div className="listingBodySaveContainer">
                            <i className="fa-regular fa-heart listingBodySaveHeart"></i>
                            <p className="listingBodySaveText">Save</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listingBodyImagesContainer">
                <div className="listingBodyMainImageContainer">
                    <div className="listingBodyMainImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage1">
                    <div className="listingBodySubImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage2">
                    <div className="listingBodySubImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage3">
                    <div className="listingBodySubImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage4">
                    <div className="listingBodySubImage"/>
                </div>
            </div>
            <div className="listingBodyMainContainer">
                <div className="listingBodyMainLeftContainer">
                    <div className="listingBodyMainLeftHostedContainer">
                        <div className="listingBodyMainLeftHostedLeftContainer">
                            <div className="listingBodyMainLeftHostedLeftTitleContainer">
                                <p className="listingBodyMainLeftHostedLeftTitleText">House hosted by Carlos</p>
                            </div>
                            <div className="listingBodyMainLeftHostedLeftInfoContainer">
                                <p className="listingBodyMainLeftHostedLeftInfoText">8 guests</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">4 bedrooms</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">4 beds</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">4 bath</p>
                            </div>
                        </div>
                        <div className="listingBodyMainRightHostedRightContainer">
                            <img src={personalPic} className="listingBodyMainRightHostedRightImage"/>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftCheckContainer">
                        <div className="listingBodyMainLeftCheckSubContainer">
                            <div className="listingBodyMainLeftCheckSubLeftContainer">
                                <i className="fa-solid fa-door-closed listingBodyMainLeftCheckSubLeftDoor"></i>
                            </div>
                            <div className="listingBodyMainLeftCheckSubRightContainer">
                                <p className="listingBodyMainLeftCheckSubRightText">Self check-in</p>
                            </div>
                        </div>
                        <div className="listingBodyMainLeftCheckSubContainer">
                            <div className="listingBodyMainLeftCheckSubLeftContainer">
                                <i className="fa-solid fa-calendar listingBodyMainLeftCheckSubLeftCalendar"></i>
                            </div>
                            <div className="listingBodyMainLeftCheckSubRightContainer">
                                <p className="listingBodyMainLeftCheckSubRightText">Free cancellation before Feb 28</p>
                            </div>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftAircoverContainer">
                        <div className="listingBodyMainLeftAircoverLogoContainer">
                            <img src={aircoverLogo} className="aircoverLogo"/>
                        </div>
                        <div className="listingBodyMainLeftAircoverDescriptionContainer">
                            <p className="listingBodyMainLeftAircoverDescriptionText">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                            </p>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftDescriptionContainer">
                        <p className="listingBodyMainLeftDescriptionText">This tree house is very unique. It features two separate sleeping quarters to give renters the ability to accommodate more friends and enjoy time together but also have private time at night. Its 25 feet up in the trees and has plenty of nature coming through and around the decks. Its also has all the amenities one would want for comfort in the main house with heat/ AC, TV, Shower, and Toilet. The bunk house also has TV/DVD, heat and AC. Come enjoy nature at its best.</p>
                    </div>
                    <div className="listingBodyMainLeftAmenitiesContainer">
                        <div className="listingBodyMainLeftAmenitiesTitleContainer">
                            <p className="listingBodyMainLeftAmenitiesTitleText">What this place offers</p>
                        </div>
                        <div className="listingBodyMainLeftAmenitiesListContainer">
                            <div className="listingBodyMainLeftAmenitiesListLeftContainer">
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-wifi listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Wifi</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-temperature-three-quarters listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Heating</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-shirt listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Washer & Dryer</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-key listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Self check-in</p>
                                    </div>
                                </div>
                            </div>
                            <div className="listingBodyMainLeftAmenitiesListRightContainer">
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-tv listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">TV</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-snowflake listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Air conditioning</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-bottle-droplet listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Essentials</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i class="fa-solid fa-bell listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Smoke alarm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftCalendarContainer">
                        <div className="listingBodyMainLeftCalendarTitleContainer">
                            <p className="listingBodyMainLeftCalendarTitleText">Select check-in date</p>
                        </div>
                        <div className="listingBodyMainLeftCalendarBodyContainer">
                            <Calendar/>
                        </div>
                        <div className="listingBodyMainLeftCalendarFooterContainer">
                            <div className="listingBodyMainLeftCalendarFooterTextContainer">
                                <p className="listingBodyMainLeftCalendarFooterText">Clear dates</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listingBodyMainRightContainer">
                </div>
            </div>
        </div>
    )
}

export default ListingBody
