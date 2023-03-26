import React, { useState, useRef, useEffect, useCallback, useContext } from "react"

import './ListingBody.css'

import homePic from '../../Images/home1.jpg'
import personalPic from '../../Images/personalPic.jpg'
import aircoverLogo from '../../Images/aircover.png'
import airbnbMapMarker2 from '../../Images/airbnbMapMarker2.png'
import Calendar from "./Calendar";
import { Navigate, useNavigate } from "react-router"
import ErrorModal from "./ErrorModal"

import { Loader } from "@googlemaps/js-api-loader"
import { AuthContext } from "../../Context/Auth-Context"

function ListingBody() {
    const navigate = useNavigate()

    const [listing, setListing] = useState(null)
    const [host, setHost] = useState(null)
    const [fetchingListing, setFetchingListing] = useState(false)
    const [fetchingHost, setFetchingHost] = useState(false)
    const [listingId, setListingId] = useState(window.location.pathname.slice(9))
    const [totalDays, setTotalDays] = useState(0)
    const [bookings, setBookings] = useState([])
    const [reviews, setReviews] = useState([])
    const [leftReviews, setLeftReviews] = useState([])
    const [rightReviews, setRightReviews] = useState([])
    const [averageRating, setAverageRating] = useState(null)
    const [averageRatings, setAverageRatings] = useState(null)

    const auth = useContext(AuthContext)

    useEffect(() => {
        async function fetchListing() {
            setFetchingListing(true)

            const response = await fetch("http://localhost:5000/" + "listing/fetchSingle", {
                method: "POST",
                body: JSON.stringify({
                    listingId: listingId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()

            if (!data.error) {
                setListing(data.listing)
                setReviews(data.listing.reviewsData.reviews)
                setBookings(data.listing.bookings)
            }

            setFetchingListing(false)
            return data
        }

        if (listingId) {
            fetchListing()
        }
    }, [listingId])

    useEffect(() => {
        async function fetchHost(hostId) {
            setFetchingHost(true)
            const response = await fetch("http://localhost:5000/" + "listing/fetchHost", {
                method: "POST",
                body: JSON.stringify({
                    hostId: hostId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json()

            if (!data.error) setHost(data.host)
            setFetchingHost(false)
            return data
        }

        if (listing && listing.placeGeneralData.host) {
            fetchHost(listing.placeGeneralData.host)
        }
    }, [listing])

    function splitReviews() {
        const leftReviewsArr = []
        const rightReviewsArr = []

        listing.reviewsData.reviews.forEach((review, index) => {
            if (index % 2 === 0) leftReviewsArr.push(review)
            else rightReviewsArr.push(review)
        })

        setLeftReviews(leftReviewsArr)
        setRightReviews(rightReviewsArr)
    }

    useEffect(() => {
        if (!fetchingListing && listing && reviews.length > 0) splitReviews()
    }, [listing])

    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)

    const [error, setError] = useState(null)

    const calendarKey1 = `calendar1-${selectedStartDate}-${selectedEndDate}`
    const calendarKey2 = `calendar2-${selectedStartDate}-${selectedEndDate}`

    const [adultsCounter, setAdultsCounter] = useState(1)
    const [childrenCounter, setChildrenCounter] = useState(0)
    const [infantsCounter, setInfantsCounter] = useState(0)
    const [petCounter, setPetCounter] = useState(0)

    function increment(counter, operator) {
        if (counter === 'adults' && !fetchingListing && listing) {
            if (operator === "-" && adultsCounter > 1) setAdultsCounter((prev) => prev - 1)
            if (operator === "+" && adultsCounter + childrenCounter < listing.placeMaxData.placeMaxGuests) setAdultsCounter((prev) => prev + 1)
        }
        if (counter === 'children' && !fetchingListing && listing) {
            if (operator === "-" && childrenCounter > 0) setChildrenCounter((prev) => prev - 1)
            if (operator === "+" && childrenCounter + adultsCounter < listing.placeMaxData.placeMaxGuests) setChildrenCounter((prev) => prev + 1)
        }
        if (counter === 'infants') {
            if (operator === "-" && infantsCounter > 0) setInfantsCounter((prev) => prev - 1)
            if (operator === "+" && infantsCounter < 4) setInfantsCounter((prev) => prev + 1)
        }
        if (counter === 'pets') {
            if (listing && listing.placeMaxData.placePets) {
                if (operator === "-" && petCounter > 0) setPetCounter((prev) => prev - 1)
                if (operator === "+" && petCounter < 4) setPetCounter((prev) => prev + 1)
            }
        }
    }

    const handleDateChange = (startDate, endDate, days) => {
        if (startDate && endDate && startDate > endDate) {
            [startDate, endDate] = [endDate, startDate]
        }

        setSelectedStartDate(startDate)
        setSelectedEndDate(endDate)
        setTotalDays(days)
    }

    const formatDate = (date) => {
        if (!date) return "Not selected"
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
    }

    const formatDate2 = (timestamp) => {
        if (!timestamp) return "--"
        const date = new Date(timestamp)
        const month = date.toLocaleString("en-US", { month: "long" })
        const year = date.getFullYear()
        return `${month} ${year}`
    }

    const [checkInContainerVisible, setCheckInContainerVisible] = useState(false)
    const [guestsContainerVisible, setGuestsContainerVisible] = useState(false)

    const stickyContainerRef = useRef()
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

    useEffect(() => {
        if (listing && window.google) {
            const google = window.google

            let map = new google.maps.Map(document.getElementById("listingBodyMainMapContainer"), {
                center: { lat: listing.placeLocationData.coordinates.lat, lng: listing.placeLocationData.coordinates.lng },
                zoom: 15,
                zoomControl: true,
                scrollwheel: false,
                rotateControl: false,
                scaleControl: false,
                fullscreenControl: false,
            })

            let icon = {
                url: airbnbMapMarker2,
                scaledSize: new google.maps.Size(60, 60),
            }

            let mapStyling = [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                },
                {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                },
            ]

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(listing.placeLocationData.coordinates.lat, listing.placeLocationData.coordinates.lng),
                map: map,
            })

            marker.setIcon(icon)
            map.set("styles", mapStyling)
        }
    }, [window.google, listing])

    function toProfileHandler() {
        navigate("/profile/" + host._id)
    }

    const offsetTop = 700
    const topOffset = 186
    const topOffset2 = 334
    const absoluteTopCheckIn = 800
    const absoluteGuests = 950

    const applyStickyPositioning = useCallback(() => {
        const scrollY = window.pageYOffset;

        if (scrollY >= 1700) {
            setCheckInContainerVisible(false)
            setGuestsContainerVisible(false)
        } else if (scrollY >= offsetTop) {
            if (checkInContainerVisible && checkInContainerRef.current) {
                checkInContainerRef.current.style.position = 'fixed'
                checkInContainerRef.current.style.top = `${topOffset}px`
            }

            if (guestsContainerVisible && guestsContainerRef.current) {
                guestsContainerRef.current.style.position = 'fixed'
                guestsContainerRef.current.style.top = `${topOffset2}px`
            }
        }
        else {
            if (checkInContainerVisible && checkInContainerRef.current) {
                checkInContainerRef.current.style.position = 'absolute'
                checkInContainerRef.current.style.top = `${absoluteTopCheckIn}px`
            }

            if (guestsContainerVisible && guestsContainerRef.current) {
                guestsContainerRef.current.style.position = 'absolute'
                guestsContainerRef.current.style.top = `${absoluteGuests}px`
            }
        }
    }, [checkInContainerVisible, guestsContainerVisible])

    useEffect(() => {
        if (stickyContainerRef.current) {
            const handleScroll = () => {
                applyStickyPositioning()
            }

            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [stickyContainerRef.current, applyStickyPositioning])

    console.log(totalDays)

    useEffect(() => {
        if (stickyContainerRef.current) {
            applyStickyPositioning()
        }
    }, [checkInContainerVisible, guestsContainerVisible, applyStickyPositioning])

    function toCheckoutHandler() {
        if (selectedStartDate && selectedEndDate && adultsCounter > 0 && auth.token) {
            const queryParams = new URLSearchParams({
                start: selectedStartDate.toISOString(),
                end: selectedEndDate.toISOString(),
                adults: adultsCounter,
                children: childrenCounter,
                infants: infantsCounter,
                pets: petCounter,
                totalDays: totalDays,
                listingId: listingId
            })

            navigate("/checkout/?" + queryParams.toString())
        }
        else {
            let errorMessage = 'Error: '
            if (!selectedStartDate || !selectedEndDate) {
                errorMessage += 'Please select start and end dates.'
            }
            if (adultsCounter < 1) {
                errorMessage += ' Please select at least one adult.'
            }
            if (!auth.token) {
                errorMessage += ' You must be logged in to book a reservation.'
            }

            setError(errorMessage)
        }
    }

    const closeModal = () => {
        setError(false)
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

            const overallRating = (totalStars / (reviews.length * 6)).toFixed(2)
            return overallRating
        }
        else return "New"
    }

    useEffect(() => {
        if (reviews.length > 0) setAverageRating(calculateAverageRating(reviews))
    }, [reviews])

    return (
        <div className="listingBodyContainer">
            <div className="floatingListingHeader" id="floatingListingHeader">
                <div className="floatingListingHeaderLeft">
                    <a className="floatingListingNavContainer" href="#photosAnchor">
                        <p className="floatingListingNavText">Photos</p>
                    </a>
                    <a className="floatingListingNavContainer" href="#amenitiesAnchor">
                        <p className="floatingListingNavText">Amenities</p>
                    </a>
                    <a className="floatingListingNavContainer" href="#reviewsAnchor">
                        <p className="floatingListingNavText">Reviews</p>
                    </a>
                    <a className="floatingListingNavContainer" href="#locationAnchor">
                        <p className="floatingListingNavText">Location</p>
                    </a>
                </div>
                <div className="floatingListingHeaderRight" id="floatingListingHeaderRight">
                    <div className="floatingListingHeaderRightLeft">
                        <div className="floatingListingHeaderRightLeftUpper">
                            <p className="floatingListingHeaderRightLeftUpperPriceText">{listing ? "$" + listing.placePriceData.priceCounter : "Loading"}</p>
                            <p className="floatingListingHeaderRightLeftUpperNightText">night</p>
                        </div>
                        <div className="floatingListingHeaderRightLeftLower">
                            <div className="floatingListReviewContainer">
                                <i className="fa-solid fa-star floatingListingStar"></i>
                                <p className="floatingListingReviewText">{averageRating}</p>
                            </div>
                            <p className="floatingListingDotText">•</p>
                            <a className="floatingListingReviewCountText">{(listing && !fetchingListing) && listing.reviewsData.reviewsCount + " reviews"}</a>
                        </div>
                    </div>
                    <div className="floatingListingHeaderRightRight">
                        <button className="floatingListingReserveButton" onClick={toCheckoutHandler}>Reserve</button>
                    </div>
                </div>
            </div>
            <a id="photosAnchor"></a>
            <div className="listingBodyIntroContainer">
                <div className="listingBodyTitleContainer">
                    <p className="listingBodyTitleText">{(listing && !fetchingListing) && listing.placeGeneralData.placeTitle}</p>
                </div>
                <div className="listingBodyInfoContainer">
                    <div className="listingBodyInfoContainerLeft">
                        <div className="listingBodyReviewContainer">
                            <i className="fa-solid fa-star listingBodyStar"></i>
                            <p className="listingBodyReviewText">{averageRating}</p>
                        </div>
                        <p className="listingBodyDotText">•</p>
                        <a className="listingBodyReviewCountText" href="#reviewsAnchor">{(listing && !fetchingListing) && listing.reviewsData.reviewsCount + " reviews"}</a>
                        <p className="listingBodyDotText">•</p>
                        <a className="listingBodyLocationText" href="#locationAnchor">{(listing && !fetchingListing) && listing.placeLocationData.placeCity + ", " + listing.placeLocationData.placeState}</a>
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
                    <div
                        className="listingBodyMainImage"
                        style={{
                            backgroundImage: (!fetchingListing && listing && listing.imageIds)
                            ? `url(https://airebnb.s3.us-east-2.amazonaws.com/${listing.imageIds[0]})`
                            : "none",
                        }}
                    />
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage1">
                    <div className="listingBodySubImage"
                        style={{
                            backgroundImage: (!fetchingListing && listing && listing.imageIds)
                            ? `url(https://airebnb.s3.us-east-2.amazonaws.com/${listing.imageIds[1]})`
                            : "none",
                        }}
                    />
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage2">
                    <div className="listingBodySubImage"
                        style={{
                            backgroundImage: (!fetchingListing && listing && listing.imageIds)
                            ? `url(https://airebnb.s3.us-east-2.amazonaws.com/${listing.imageIds[2]})`
                            : "none",
                        }}
                    />
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage3">
                    <div className="listingBodySubImage"
                        style={{
                            backgroundImage: (!fetchingListing && listing && listing.imageIds)
                            ? `url(https://airebnb.s3.us-east-2.amazonaws.com/${listing.imageIds[3]})`
                            : "none",
                        }}
                    />
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage4">
                    <div className="listingBodySubImage"
                        style={{
                            backgroundImage: (!fetchingListing && listing && listing.imageIds)
                            ? `url(https://airebnb.s3.us-east-2.amazonaws.com/${listing.imageIds[4]})`
                            : "none",
                        }}
                    />
                </div>
            </div>
            <div className="listingBodyMainContainer">
                <div className="listingBodyMainLeftContainer">
                    <div className="listingBodyMainLeftHostedContainer">
                        <div className="listingBodyMainLeftHostedLeftContainer">
                            <div className="listingBodyMainLeftHostedLeftTitleContainer">
                                <p className="listingBodyMainLeftHostedLeftTitleText">{(!fetchingHost && host) &&"House hosted by " + host.firstName}</p>
                            </div>
                            <div className="listingBodyMainLeftHostedLeftInfoContainer">
                                <p className="listingBodyMainLeftHostedLeftInfoText">{(!fetchingListing && listing) &&
                                listing.placeMaxData.placeMaxGuests + " guests"}</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">{(!fetchingListing && listing) &&
                                listing.placeMaxData.placeBedrooms + " bedrooms"}</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">{(!fetchingListing && listing) &&
                                listing.placeMaxData.placeBeds + " beds"}</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">{(!fetchingListing && listing) &&
                                listing.placeMaxData.placeBathrooms + " bath"}</p>
                            </div>
                        </div>
                        <div className="listingBodyMainRightHostedRightContainer">
                            <a href="#profileAnchor">
                                <img src={(!fetchingHost && host) ? ("https://airebnb.s3.us-east-2.amazonaws.com/" + host.profilePicture) : null} className="listingBodyMainRightHostedRightImage"/>
                            </a>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftCheckContainer">
                        {listing && listing.placeAmenitiesData.selfCheckIn && <div className="listingBodyMainLeftCheckSubContainer">
                            <div className="listingBodyMainLeftCheckSubLeftContainer">
                                <i className="fa-solid fa-door-closed listingBodyMainLeftCheckSubLeftDoor"></i>
                            </div>
                            <div className="listingBodyMainLeftCheckSubRightContainer">
                                <p className="listingBodyMainLeftCheckSubRightText">Self check-in</p>
                            </div>
                        </div>}
                        <div className="listingBodyMainLeftCheckSubContainer">
                            <div className="listingBodyMainLeftCheckSubLeftContainer">
                                <i className="fa-solid fa-calendar listingBodyMainLeftCheckSubLeftCalendar"></i>
                            </div>
                            <div className="listingBodyMainLeftCheckSubRightContainer">
                                <p className="listingBodyMainLeftCheckSubRightText">Free cancellation within 72 hours</p>
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
                        <p className="listingBodyMainLeftDescriptionText">{(!fetchingListing && listing) &&
                        listing.placeGeneralData.placeDesc}</p>
                    </div>
                    <a id="amenitiesAnchor"></a>
                    <div className="listingBodyMainLeftAmenitiesContainer">
                        <div className="listingBodyMainLeftAmenitiesTitleContainer">
                            <p className="listingBodyMainLeftAmenitiesTitleText">What this place offers</p>
                        </div>
                        <div className="listingBodyMainLeftAmenitiesListContainer">
                            <div className="listingBodyMainLeftAmenitiesListLeftContainer">
                                {(!fetchingListing && listing && listing.placeAmenitiesData.wifi) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-wifi listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Wifi</p>
                                    </div>
                                </div>}
                                {(!fetchingListing && listing && listing.placeAmenitiesData.heating) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-temperature-three-quarters listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Heating</p>
                                    </div>
                                </div>}
                                {(!fetchingListing && listing && listing.placeAmenitiesData.washerDryer) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-shirt listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Washer & Dryer</p>
                                    </div>
                                </div>}
                                {(!fetchingListing && listing && listing.placeAmenitiesData.selfCheckIn) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-key listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Self check-in</p>
                                    </div>
                                </div>}
                            </div>
                            <div className="listingBodyMainLeftAmenitiesListRightContainer">
                                {(!fetchingListing && listing && listing.placeAmenitiesData.tv) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-tv listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">TV</p>
                                    </div>
                                </div>}
                                {(!fetchingListing && listing && listing.placeAmenitiesData.ac) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-snowflake listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Air conditioning</p>
                                    </div>
                                </div>}
                                {(!fetchingListing && listing && listing.placeAmenitiesData.essentials) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-bottle-droplet listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Essentials</p>
                                    </div>
                                </div>}
                                {(!fetchingListing && listing && listing.placeAmenitiesData.smokeAlarm) && <div className="listingBodyMainLeftAmenityContainer">
                                    <div className="listingBodyMainLeftAmenityLeftContainer">
                                        <i className="fa-solid fa-bell listingBodyMainLeftAmenity"></i>
                                    </div>
                                    <div className="listingBodyMainLeftAmenityRightContainer">
                                        <p className="listingBodyMainLeftAmenityText">Smoke alarm</p>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftCalendarContainer">
                        <div className="listingBodyMainLeftCalendarTitleContainer">
                            <p className="listingBodyMainLeftCalendarTitleText">Select check-in date</p>
                        </div>
                        <div className="listingBodyMainLeftCalendarBodyContainer">
                            {!fetchingListing && listing && <Calendar key={calendarKey1} onDateChange={handleDateChange} selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate} bookings={bookings}ref={calendarRef}/>}
                        </div>
                        <div className="listingBodyMainLeftCalendarFooterContainer">
                            <div className="listingBodyMainLeftCalendarFooterTextContainer" onClick={handleClearDates}>
                                <p className="listingBodyMainLeftCalendarFooterText">Clear dates</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listingBodyMainRightContainer" ref={stickyContainerRef}>
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
                                        <p className={!selectedStartDate ?"listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText2" : "listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText22"}>{selectedStartDate ? formatDate(selectedStartDate) : "Add date"}</p>
                                    </div>
                                    <div className="listingBodyMainRightCheckBodyContainerMainUpperRight2">
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInText2">CHECKOUT</p>
                                        <p className={!selectedEndDate ?"listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText2" : "listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText22"}>{selectedEndDate ? formatDate(selectedEndDate) : "Add date"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckInContainerLower">
                            {!fetchingListing && listing && <Calendar key={calendarKey2} onDateChange={handleDateChange} selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate} bookings={bookings} ref={calendarRef2}/>}
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
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("adults", "-")}>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>
                                </div>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>{adultsCounter}</p>
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("adults", "+")}>
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
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("children", "-")}>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>
                                </div>

                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>{childrenCounter}</p>

                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("children", "+")}>
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
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("infants", "-")}>
                                    <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>
                                </div>

                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>{infantsCounter}</p>

                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("infants", "+")}>
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
                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("pets", "-")}>
                                    {(!fetchingListing && listing && listing.placeMaxData.placePets) && <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>-</p>}
                                </div>

                                    <p className='homeHeader2SearchDropdownGuestContainerRightNumber2'>{petCounter}</p>

                                <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer2' onClick={() => increment("pets", "+")}>
                                    {(!fetchingListing && listing && listing.placeMaxData.placePets) && <p className='homeHeader2SearchDropdownGuestContainerRightIcon2'>+</p>}
                                </div>
                            </div>
                        </div>
                        <p className="homeHeader2SearchDropdownGuestContainer4">{(!fetchingListing && listing) && `This place has a maximum of ${listing.placeMaxData.placeMaxGuests} guests, not including infants. Pets ${listing.placeMaxData.placePets ? "are allowed." : "aren't allowed."}`}</p>
                    </div>}

                    <div className="listingBodyMainRightCheckContainer">
                        <div className="listingBodyMainRightCheckHeaderContainer">
                            <div className="listingBodyMainRightCheckHeaderLeft">
                                <p className="listingBodyMainRightCheckHeaderLeftPriceText">{listing ? "$" + listing.placePriceData.priceCounter : "--- "}</p>
                                <p className="listingBodyMainRightCheckHeaderLeftNightText">night</p>
                            </div>
                            <div className="listingBodyMainRightCheckHeaderRight">
                                <div className="listingBodyReviewContainer">
                                    <i className="fa-solid fa-star listingBodyStar"></i>
                                    <p className="listingBodyReviewText">{averageRating}</p>
                                </div>
                                <p className="listingBodyDotText">•</p>
                                <a className="listingBodyReviewCountText2" href="#reviewsAnchor">{listing ? listing.reviewsData.reviewsCount + " reviews" : "-"}</a>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckBodyContainer">
                            <div className="listingBodyMainRightCheckBodyContainerMain">
                                <div className="listingBodyMainRightCheckBodyContainerMainUpper" onClick={handleUpperClick}>
                                    <div className="listingBodyMainRightCheckBodyContainerMainUpperLeft">
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInText">CHECK-IN</p>
                                        <p className={!selectedStartDate ? "listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText" : "listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText2"}>{selectedStartDate ? formatDate(selectedStartDate) : "Add date"}</p>
                                    </div>
                                    <div className="listingBodyMainRightCheckBodyContainerMainUpperRight">
                                        <p className="listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInText">CHECKOUT</p>
                                        <p className={!selectedEndDate ? "listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText" : "listingBodyMainRightCheckBodyContainerMainUpperLeftCheckInDateText2"}>{selectedEndDate ? formatDate(selectedEndDate) : "Add date"}</p>
                                    </div>
                                </div>
                                <div className="listingBodyMainRightCheckBodyContainerMainLower" onClick={handleLowerClick}>
                                    <div className="listingBodyMainRightCheckBodyContainerMainLowerLeft">
                                        <p className="listingBodyMainRightCheckBodyContainerMainLowerLeftGuestsText">GUESTS</p>
                                        <p className="listingBodyMainRightCheckBodyContainerMainLowerLeftGuestsNumText">{(adultsCounter > 1 || childrenCounter > 0 || infantsCounter > 0 || petCounter > 0) ? (adultsCounter + childrenCounter) + " guests, " + (infantsCounter) + " infants, " + (petCounter) + " pets" : "1 guest"}</p>
                                    </div>
                                    <i className="fa-solid fa-chevron-down listingBodyMainRightCheckBodyContainerMainLowerLeftChevronDown"></i>
                                </div>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckButtonContainer">
                            <button className="listingBodyMainRightCheckButton" onClick={toCheckoutHandler}>Reserve</button>
                        </div>
                        <p className="listingBodyMainRightCheckDisclaimerText">You won't be charged yet</p>
                        <div className="listingBodyMainRightCheckFeesContainer">
                            <div className="listingBodyMainRightCheckFeeContainer">
                                <p className="listingBodyMainRightCheckFeeLeft">{(listing && !fetchingListing) && ["$", listing.placePriceData.priceCounter, " x ", totalDays, " nights"]}</p>
                                <p className="listingBodyMainRightCheckFeeRight">{(listing && !fetchingListing) && ["$", (listing.placePriceData.priceCounter * totalDays).toFixed(2)]}</p>
                            </div>
                            <div className="listingBodyMainRightCheckFeeContainer">
                                <p className="listingBodyMainRightCheckFeeLeft">Cleaning fee</p>
                                <p className="listingBodyMainRightCheckFeeRight">{(listing && !fetchingListing) && ["$", listing.placePriceData.cleaningFee.toFixed(2)]}</p>
                            </div>
                            <div className="listingBodyMainRightCheckFeeContainer">
                                <p className="listingBodyMainRightCheckFeeLeft">Airbnb service fee</p>
                                <p className="listingBodyMainRightCheckFeeRight">{(listing && !fetchingListing) && ["$", listing.placePriceData.airbnbFee.toFixed(2)]}</p>
                            </div>
                        </div>
                        <div className="listingBodyMainRightCheckTotalContainer">
                            <p className="listingBodyMainRightCheckTotalLeft">Total before taxes</p>
                            <p className="listingBodyMainRightCheckTotalRight">{(listing && !fetchingListing) && ["$", ((listing.placePriceData.priceCounter * totalDays) + listing.placePriceData.cleaningFee + listing.placePriceData.airbnbFee).toFixed(2)]}</p>
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
                                    <div
                                        className="listingBodyReviewBarFiller"
                                        style={{
                                            width: `${(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0)
                                            ? averageRatings.cleanlinessRating * 20
                                            : 0}%`,
                                        }}
                                    />
                                </div>
                                <p className="listingBodyReviewNumber">{(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0) && averageRatings.cleanlinessRating}</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Communication</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div
                                        className="listingBodyReviewBarFiller"
                                        style={{
                                            width: `${(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0)
                                            ? averageRatings.communicationRating * 20
                                            : 0}%`,
                                        }}
                                    />
                                </div>
                                <p className="listingBodyReviewNumber">{(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0) && averageRatings.communicationRating}</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Check-in</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div
                                        className="listingBodyReviewBarFiller"
                                        style={{
                                            width: `${(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0)
                                            ? averageRatings.checkInRating * 20
                                            : 0}%`,
                                        }}
                                    />
                                </div>
                                <p className="listingBodyReviewNumber">{(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0) && averageRatings.checkInRating}</p>
                            </div>
                        </div>
                    </div>
                    <div className="listingBodyReviewStatsContainerRight">
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Accuracy</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                <div
                                        className="listingBodyReviewBarFiller"
                                        style={{
                                            width: `${(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0)
                                            ? averageRatings.accuracyRating * 20
                                            : 0}%`,
                                        }}
                                    />
                                </div>
                                <p className="listingBodyReviewNumber">{(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0) && averageRatings.accuracyRating}</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Location</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div
                                        className="listingBodyReviewBarFiller"
                                        style={{
                                            width: `${(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0)
                                            ? averageRatings.locationRating * 20
                                            : 0}%`,
                                        }}
                                    />
                                </div>
                                <p className="listingBodyReviewNumber">{(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0) && averageRatings.locationRating}</p>
                            </div>
                        </div>
                        <div className="listingBodyReviewStatContainer">
                            <p className="listingBodyReviewStatLabel">Value</p>
                            <div className="listingBodyReviewBarContainer">
                                <div className="listingBodyReviewBar">
                                    <div
                                        className="listingBodyReviewBarFiller"
                                        style={{
                                            width: `${(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0)
                                            ? averageRatings.valueRating * 20
                                            : 0}%`,
                                        }}
                                    />
                                </div>
                                <p className="listingBodyReviewNumber">{(!fetchingListing && listing && averageRatings && Object.keys(averageRatings).length > 0) && averageRatings.valueRating}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listingBodyReviewsBodyContainer">
                    <div className="listingBodyReviewsBodyContainerLeft">
                        {(!fetchingListing && listing && leftReviews.length > 0) && leftReviews.map((review) => (
                            <div key={review._id} className="listingBodyFullReviewContainer">
                                <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={(!fetchingListing && listing) ? ("https://airebnb.s3.us-east-2.amazonaws.com/" + review.creatorProfilePicture) : null} className="fullReviewProfilePic" />
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">{review.creatorFirstName}</p>
                                    <p className="fullReviewPostMonth">{formatDate2(review.postedDate)}</p>
                                </div>
                                </div>
                                <div className="listingBodyFullReviewDescContainer">
                                    <p className="listingBodyFullReviewDesc">{review.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="listingBodyReviewsBodyContainerRight">
                        {(!fetchingListing && listing && rightReviews.length > 0) && rightReviews.map((review) => (
                            <div key={review._id} className="listingBodyFullReviewContainer">
                                <div className="listingBodyFullReviewProfileContainer">
                                <div className="listingBodyFullReviewProfileContainerLeft">
                                    <img src={review.creatorProfilePicture} className="fullReviewProfilePic" />
                                </div>
                                <div className="listingBodyFullReviewProfileContainerRight">
                                    <p className="fullReviewProfileName">{review.creatorFirstName}</p>
                                    <p className="fullReviewPostMonth">{review.postedDate}</p>
                                </div>
                                </div>
                                <div className="listingBodyFullReviewDescContainer">
                                    <p className="listingBodyFullReviewDesc">{review.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <a id="locationAnchor"></a>
            <div className="listingBodyMapContainer">
                <div className="listingBodyMapHeaderContainer">
                    <p className="listingBodyMapHeaderText1">Where you'll be</p>
                    <p className="listingBodyMapHeaderText2">{(listing && !fetchingListing) && listing.placeLocationData.placeCity + ", " + listing.placeLocationData.placeState}</p>
                </div>
                <div className="listingBodyMainMapContainer" id="listingBodyMainMapContainer">

                </div>
            </div>
            <a id="profileAnchor"></a>
            <div className="listingBodyHostedByContainer">
                <div className="listingBodyHostedByContainerMainLeft">
                    <div className="listingBodyHostedByProfileContainer">
                        <div className="listingBodyHostedByContainerLeft">
                            <img src={(!fetchingHost && host) ? ("https://airebnb.s3.us-east-2.amazonaws.com/" + host.profilePicture) : null} className="listingBodyHostedByProfilePicture" onClick={toProfileHandler}/>
                        </div>
                        <div className="listingBodyHostedByContainerRight">
                            <p className="listingBodyHostedByContainerRightHostedByText">{(!fetchingHost && host) && `Hosted by ${host.firstName}`}</p>
                            <p className="listingBodyHostedByContainerRightDateJoinedText">{(!fetchingHost && host) && `Joined in ${formatDate2(host.joinedDate)}`}</p>
                        </div>
                    </div>
                    <div className="listingBodyHostedByReviewsContainer">
                        <i className="fa-solid fa-star listingBodyHostedByStar"></i>
                        <p className="listingBodyReviewText4">{(!fetchingHost && host) && `${host.reviewsReceived.reviewsReceivedCount} ${host.reviewsReceived.reviewsReceivedCount === 1 ? "Review" : "Reviews"}`}</p>
                    </div>
                    <div className="listingBodyHostedByDuringStayContainer">
                        <p className="listingBodyHostedByDuringStayTitle">About</p>
                        <p className="listingBodyHostedByDuringStayDesc">{(!fetchingHost && host) && `${host.aboutDescription}`}</p>
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
            {error && <ErrorModal errors={[error]} closeModal={closeModal} />}
        </div>
    )
}

export default ListingBody
