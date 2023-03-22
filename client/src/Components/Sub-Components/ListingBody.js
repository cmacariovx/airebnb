import React, { useState, useRef, useEffect } from "react";

import './ListingBody.css'

import homePic from '../../Images/home1.jpg'
import personalPic from '../../Images/personalPic.jpg'
import aircoverLogo from '../../Images/aircover.png'
import airbnbMapMarker2 from '../../Images/airbnbMapMarker2.png'
import Calendar from "./Calendar";
import { Navigate, useNavigate } from "react-router";

import { Loader } from "@googlemaps/js-api-loader"

function ListingBody() {
    const navigate = useNavigate()

    const [checkInContainerVisible, setCheckInContainerVisible] = useState(false)
    const [guestsContainerVisible, setGuestsContainerVisible] = useState(false);

    const guestsContainerRef = useRef()
    const checkInContainerRef = useRef()

    let [floatingHeader, setFloatingHeader] = useState()
    let [floatingHeaderRight, setFloatingHeaderRight] = useState()

    const h = document.documentElement
    const b = document.body
    const st = 'scrollTop'
    const sh = 'scrollHeight';

    useEffect(() => {
        if (document.readyState !== "loading") {
            setFloatingHeader(document.getElementById("floatingListingHeader"))
            setFloatingHeaderRight(document.getElementById("floatingListingHeaderRight"))
        }
    }, [])

    document.addEventListener("scroll", (e) => {
        let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

        if (floatingHeader && percent <= 22) floatingHeader.style.display = "none"
        if (floatingHeader && percent > 22 && percent < 49) floatingHeader.style.display = "flex"

        if (floatingHeaderRight && percent < 60) floatingHeaderRight.style.display = "none"
        if (floatingHeaderRight && percent > 60) floatingHeaderRight.style.display = "flex"
    })

    const handleLowerClick = () => {
        setCheckInContainerVisible(false)
        setGuestsContainerVisible(true)
    }

    const handleUpperClick = () => {
        setCheckInContainerVisible(!checkInContainerVisible)
        setGuestsContainerVisible(false)
    }

    const handleClickOutside = (event) => {
        if (
          checkInContainerRef.current &&
          !checkInContainerRef.current.contains(event.target)
        ) {
          setCheckInContainerVisible(false)
        }

        if (
          guestsContainerRef.current &&
          !guestsContainerRef.current.contains(event.target)
        ) {
          setGuestsContainerVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const calendarRef = useRef()
    const calendarRef2 = useRef()

    const handleClearDates = () => {
        if (calendarRef.current) {
            calendarRef.current.clearDates()
        }
    }

    const handleClearDates2 = () => {
        if (calendarRef2.current) {
            calendarRef2.current.clearDates()
        }
    }


    let autocomplete

    useEffect(() => {
        const loader = new Loader({
            apiKey: "process.env.REACT_APP_GOOGLE_API_KEY",
            version: "weekly",
        })

        loader.load().then((google) => {
            // let geocoder = new google.maps.Geocoder().geocode({address: "170 merrimon avenue"}).then((data) => {
            //     let coords = [data.results[0].geometry.bounds.Ia.hi, data.results[0].geometry.bounds.Ua.hi]
            // })
            let map = new google.maps.Map(document.getElementById("listingBodyMainMapContainer"), {
                center: { lat: 35.5951, lng: -82.5515 },
                zoom: 15,
                zoomControl: true,
                scrollwheel: false,
                rotateControl: false,
                scaleControl: false,
                fullscreenControl: false,
            })

            let icon = {
                url: airbnbMapMarker2,
                scaledSize: new google.maps.Size(60, 60)
            }

            let mapStyling = [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                      { visibility: "off" }
                    ]
                  },
                  {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                      { visibility: "off" }
                    ]
                  }
              ]

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(35.5951, -82.5515),
                map: map
            })

            marker.setIcon(icon)
            map.set("styles", mapStyling)
        })
    }, [])

    function toProfileHandler() {
        navigate("/profile/" + "userId")
    }

    return (
        <div className="listingBodyContainer">
            <div className="floatingListingHeader" id="floatingListingHeader">
                <div className="floatingListingHeaderLeft">
                    <a className="floatingListingNavContainer" href="#photosAnchor">
                        <a className="floatingListingNavText">Photos</a>
                    </a>
                    <a className="floatingListingNavContainer" href="#amenitiesAnchor">
                        <a className="floatingListingNavText">Amenities</a>
                    </a>
                    <a className="floatingListingNavContainer" href="#reviewsAnchor">
                        <a className="floatingListingNavText">Reviews</a>
                    </a>
                    <a className="floatingListingNavContainer" href="#locationAnchor">
                        <a className="floatingListingNavText">Location</a>
                    </a>
                </div>
                <div className="floatingListingHeaderRight" id="floatingListingHeaderRight">
                    <div className="floatingListingHeaderRightLeft">
                        <div className="floatingListingHeaderRightLeftUpper">
                            <p className="floatingListingHeaderRightLeftUpperPriceText">$175</p>
                            <p className="floatingListingHeaderRightLeftUpperNightText">night</p>
                        </div>
                        <div className="floatingListingHeaderRightLeftLower">
                            <div className="floatingListReviewContainer">
                                <i className="fa-solid fa-star floatingListingStar"></i>
                                <p className="floatingListingReviewText">4.93</p>
                            </div>
                            <p className="floatingListingDotText">•</p>
                            <a className="floatingListingReviewCountText">653 reviews</a>
                        </div>
                    </div>
                    <div className="floatingListingHeaderRightRight">
                        <button className="floatingListingReserveButton">Reserve</button>
                    </div>
                </div>
            </div>
            <a id="photosAnchor"></a>
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
                        <a className="listingBodyReviewCountText" href="#reviewsAnchor">653 reviews</a>
                        <p className="listingBodyDotText">•</p>
                        <a className="listingBodyLocationText" href="#locationAnchor">Asheville, North Carolina</a>
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
                    <a id="amenitiesAnchor"></a>
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
                                        <i className="fa-solid fa-bell listingBodyMainLeftAmenity"></i>
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
                            <Calendar ref={calendarRef}/>
                        </div>
                        <div className="listingBodyMainLeftCalendarFooterContainer">
                            <div className="listingBodyMainLeftCalendarFooterTextContainer" onClick={handleClearDates}>
                                <p className="listingBodyMainLeftCalendarFooterText">Clear dates</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listingBodyMainRightContainer">
                    {checkInContainerVisible && <div className="listingBodyMainRightCheckInContainer" ref={checkInContainerRef}>
                        <div className="listingBodyMainRightCheckInContainerUpper">
                            <div className="listingBodyMainRightCheckInContainerUpperLeft">
                                <p className="listingBodyMainRightCheckInContainerUpperLeftText1">Select dates</p>
                                <p className="listingBodyMainRightCheckInContainerUpperLeftText2">Add your travel dates for exact pricing</p>
                            </div>
                            <div className="listingBodyMainRightCheckInContainerUpperRight">
                                <div className="listingBodyMainRightCheckBodyContainerMainUpper2">
                                    <div className="listingBodyMainRightCheckBodyContainerMainUpperLeft2">
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInText2">CHECK-IN</p>
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText2">Add date</p>
                                    </div>
                                    <div className="listingBodyMainRightCheckBodyContainerMainUpperRight2">
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInText2">CHECKOUT</p>
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText2">Add date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckInContainerLower">
                            <Calendar ref={calendarRef2}/>
                            <div className="listingBodyMainLeftCalendarFooterTextContainer3" onClick={handleClearDates2}>
                                <p className="listingBodyMainLeftCalendarFooterText3">Clear dates</p>
                            </div>
                        </div>
                    </div>}

                    {guestsContainerVisible && <div className="homeHeader2SearchDropdownGuestsContainer2" ref={guestsContainerRef}>
                        <div className='homeHeader2SearchDropdownGuestContainer2'>
                            <div className='homeHeader2SearchDropdownGuestContainerLeft2'>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText3'>Adults</p>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText4'>Ages 13 or above</p>
                            </div>
                            <div className='homeHeader2SearchDropdownGuestContainerRight2'>
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>
                                </div>

                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>0</p>

                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>+</p>
                                </div>
                            </div>
                        </div>
                        <div className='homeHeader2SearchDropdownGuestContainer2'>
                            <div className='homeHeader2SearchDropdownGuestContainerLeft2'>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText3'>Children</p>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText4'>Ages 2-12</p>
                            </div>
                            <div className='homeHeader2SearchDropdownGuestContainerRight2'>
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>
                                </div>

                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>0</p>

                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>+</p>
                                </div>
                            </div>
                        </div>
                        <div className='homeHeader2SearchDropdownGuestContainer2'>
                            <div className='homeHeader2SearchDropdownGuestContainerLeft2'>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText3'>Infants</p>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText4'>Under 2</p>
                            </div>
                            <div className='homeHeader2SearchDropdownGuestContainerRight2'>
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>
                                </div>

                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>0</p>

                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>+</p>
                                </div>
                            </div>
                        </div>
                        <div className='homeHeader2SearchDropdownGuestContainer3'>
                            <div className='homeHeader2SearchDropdownGuestContainerLeft2'>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText3'>Pets</p>
                                <p className='homeHeader2SearchDropdownGuestContainerLeftText4'>Service Animals Included</p>
                            </div>
                            <div className='homeHeader2SearchDropdownGuestContainerRight2'>
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>
                                </div>

                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>0</p>

                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2'>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>+</p>
                                </div>
                            </div>
                        </div>
                    </div>}

                    <div className="listingBodyMainRightCheckContainer">
                        <div className="listingBodyMainRightCheckHeaderContainer">
                            <div className="listingBodyMainRightCheckHeaderLeft">
                                <p className="listingBodyMainRightCheckHeaderLeftPriceText">$175</p>
                                <p className="listingBodyMainRightCheckHeaderLeftNightText">night</p>
                            </div>
                            <div className="listingBodyMainRightCheckHeaderRight">
                                <div className="listingBodyReviewContainer">
                                    <i className="fa-solid fa-star listingBodyStar"></i>
                                    <p className="listingBodyReviewText">4.93</p>
                                </div>
                                <p className="listingBodyDotText">•</p>
                                <a className="listingBodyReviewCountText2" href="#reviewsAnchor">653 reviews</a>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckBodyContainer">
                            <div className="listingBodyMainRightCheckBodyContainerMain">
                                <div className="listingBodyMainRightCheckBodyContainerMainUpper" onClick={handleUpperClick}>
                                    <div className="listingBodyMainRightCheckBodyContainerMainUpperLeft">
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInText">CHECK-IN</p>
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText">3/3/2023</p>
                                    </div>
                                    <div className="listingBodyMainRightCheckBodyContainerMainUpperRight">
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInText">CHECKOUT</p>
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText">3/7/2023</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainRightCheckBodyContainerMainLower" onClick={handleLowerClick}>
                                    <div className="listingBodyMainRightCheckBodyContainerMainLowerLeft">
                                        <p className="listingBodyMainRightCheckBodyContainerMainLowerLeftGuestsText">GUESTS</p>
                                        <p className="listingBodyMainRightCheckBodyContainerMainLowerLeftGuestsNumText">1 guest</p>
                                    </div>
                                    <i className="fa-solid fa-chevron-down listingBodyMainRightCheckBodyContainerMainLowerLeftChevronDown"></i>
                                </div>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckButtonContainer">
                            <button className="listingBodyMainRightCheckButton">Reserve</button>
                        </div>
                        <p className="listingBodyMainRightCheckDisclaimerText">You won't be charged yet</p>
                        <div className="listingBodyMainRightCheckFeesContainer">
                            <div className="listingBodyMainRightCheckFeeContainer">
                                <p className="listingBodyMainRightCheckFeeLeft">$175 x 2 nights</p>
                                <p className="listingBodyMainRightCheckFeeRight">$350</p>
                            </div>
                            <div className="listingBodyMainRightCheckFeeContainer">
                                <p className="listingBodyMainRightCheckFeeLeft">Cleaning fee</p>
                                <p className="listingBodyMainRightCheckFeeRight">$50</p>
                            </div>
                            <div className="listingBodyMainRightCheckFeeContainer">
                                <p className="listingBodyMainRightCheckFeeLeft">Airbnb service fee</p>
                                {/* 14%-16% airbnb fee */}
                                <p className="listingBodyMainRightCheckFeeRight">$56</p>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckTotalContainer">
                            <p className="listingBodyMainRightCheckTotalLeft">Total before taxes</p>
                            <p className="listingBodyMainRightCheckTotalRight">$456</p>
                        </div>
                    </div>
                </div>
            </div>
            <a id="reviewsAnchor"></a>
            <div className="listingBodyReviewsContainer">
                <div className="listingBodyReviewsHeaderContainer">
                    <div className="listingBodyReviewContainer2">
                        <i className="fa-solid fa-star listingBodyStar2"></i>
                        <p className="listingBodyReviewText2">4.93</p>
                    </div>
                    <p className="listingBodyDotText2">•</p>
                    <a className="listingBodyReviewCountText3">653 reviews</a>
                </div>
                <div className="listingBodyReviewStatsContainer">
                    <div className="listingBodyReviewStatsContainerLeft">
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Cleanliness</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div className="listingBodyReviewBarFiller"/>
                                </div>
                                <p className="listingBodyReviewNumber">4.9</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Communication</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div className="listingBodyReviewBarFiller"/>
                                </div>
                                <p className="listingBodyReviewNumber">4.9</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Check-in</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div className="listingBodyReviewBarFiller"/>
                                </div>
                                <p className="listingBodyReviewNumber">4.9</p>
                            </div>
                        </div>
                    </div>
                    <div className="listingBodyReviewStatsContainerRight">
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Accuracy</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div className="listingBodyReviewBarFiller"/>
                                </div>
                                <p className="listingBodyReviewNumber">4.9</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Location</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div className="listingBodyReviewBarFiller"/>
                                </div>
                                <p className="listingBodyReviewNumber">4.9</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Value</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div className="listingBodyReviewBarFiller"/>
                                </div>
                                <p className="listingBodyReviewNumber">4.9</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listingBodyReviewsBodyContainer">
                    <div className="listingBodyReviewsBodyContainerLeft">
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                    </div>
                    <div className="listingBodyReviewsBodyContainerRight">
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                {/* char limit of 170 */}
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                        <div className="listingBodyFullReviewContainer">
                            <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={personalPic} className="fullReviewProfilePic"/>
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">Carlos</p>
                                    <p className="fullReviewPostMonth">March 2023</p>
                                </div>
                            </div>
                            <div className="listingBodyFullReviewDescContainer">
                                <p className="listingBodyFullReviewDesc">We stayed for a quick night on our way home from Disney with our kids and my mom. it was perfect. Mom had her own spot to sleep, and the kids enjoyed the treehouse.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a id="locationAnchor"></a>
            <div className="listingBodyMapContainer">
                <div className="listingBodyMapHeaderContainer">
                    <p className="listingBodyMapHeaderText1">Where you'll be</p>
                    <p className="listingBodyMapHeaderText2">Asheville, North Carolina</p>
                </div>
                <div className="listingBodyMainMapContainer" id="listingBodyMainMapContainer">

                </div>
            </div>
            <div className="listingBodyHostedByContainer">
                <div className="listingBodyHostedByContainerMainLeft">
                    <div className="listingBodyHostedByProfileContainer">
                        <div className="listingBodyHostedByContainerLeft">
                            <img src={personalPic} className="listingBodyHostedByProfilePicture" onClick={toProfileHandler}/>
                        </div>
                        <div className="listingBodyHostedByContainerRight">
                            <p className="listingBodyHostedByContainerRightHostedByText">Hosted by Carlos</p>
                            <p className="listingBodyHostedByContainerRightDateJoinedText">Joined in March 2023</p>
                        </div>
                    </div>
                    <div className="listingBodyHostedByReviewsContainer">
                        <i className="fa-solid fa-star listingBodyHostedByStar"></i>
                        <p className="listingBodyReviewText4">110 Reviews</p>
                    </div>
                    <div className="listingBodyHostedByDuringStayContainer">
                        <p className="listingBodyHostedByDuringStayTitle">During your stay</p>
                        <p className="listingBodyHostedByDuringStayDesc">I live 2 miles from the farm and have no problem helping guests when needed. I tend to stay away from the guests during their stay but try to be available whenever I can by phone or person when needed.</p>
                    </div>
                </div>
            </div>
            <div className="listingBodyExploreContainer">
                <div className="listingBodyExploreTitleContainer">
                    <p className="listingBodyExploreTitle">Explore other options</p>
                </div>
                <div className="listingBodyExploreOptionsContainer">
                    <p className="listingBodyExploreOption">Asheville</p>
                    <p className="listingBodyExploreOption">Seattle</p>
                    <p className="listingBodyExploreOption">Hilton Head</p>
                    <p className="listingBodyExploreOption">Beverly Hills</p>
                </div>
            </div>
        </div>
    )
}

export default ListingBody
