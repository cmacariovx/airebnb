import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import { Ripples } from '@uiball/loaders'

import ErrorModal from "../Sub-Components/ErrorModal"

import amexLogo from '../../Images/amexLogo.svg'
import visaLogo from '../../Images/visaLogo.svg'
import mastercardLogo from '../../Images/mastercardLogo.svg'
import discoverLogo from '../../Images/discoverLogo.svg'

import airbnbLogo from '../../Images/airbnbLogo.png'
import aircover from '../../Images/aircover.png'
import home from '../../Images/home1.jpg'

import './Checkout.css'
import { AuthContext } from "../../Context/Auth-Context"

function Checkout() {
    const [searchParams] = useSearchParams()
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [adultsCounter, setAdultsCounter] = useState(null)
    const [childrenCounter, setChildrenCounter] = useState(null)
    const [infantsCounter, setInfantsCounter] = useState(null)
    const [petCounter, setPetCounter] = useState(null)
    const [listingId, setListingId] = useState(null)
    const [bookingReservation, setBookingReservation] = useState(false)
    const [fetchingListing, setFetchingListing] = useState(false)
    const [listing, setListing] = useState(null)
    const [reviews, setReviews] = useState([])
    const [averageRating, setAverageRating] = useState(null)
    const [averageRatings, setAverageRatings] = useState(null)
    const [totalDays, setTotalDays] = useState(null)
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [errorModalMessage, setErrorModalMessage] = useState(null)

    const auth = useContext(AuthContext)

    useEffect(() => {
        setSelectedStartDate(new Date(searchParams.get('start')))
        setSelectedEndDate(new Date(searchParams.get('end')))
        setAdultsCounter(parseInt(searchParams.get('adults')))
        setChildrenCounter(parseInt(searchParams.get('children')))
        setInfantsCounter(parseInt(searchParams.get('infants')))
        setPetCounter(parseInt(searchParams.get('pets')))
        setTotalDays(parseInt(searchParams.get('totalDays')))
        setListingId(searchParams.get('listingId'))
    }, [searchParams])

    const navigate = useNavigate()

    const formatDate = (date) => {
        if (!date) return "Not selected"
        const month = date.toLocaleString("en-US", { month: "short" })
        const day = date.getDate()
        return `${month} ${day}`
    }

    function toLinkedInProfile(event) {
        event.preventDefault()
        window.open("https://www.linkedin.com/in/carlos-macariooo/")
    }

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
            }

            setFetchingListing(false)
            return data
        }

        if (listingId) {
            fetchListing()
        }
    }, [listingId])

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

    const monthNameToNumber = (monthName) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return monthNames.indexOf(monthName) + 1
    }

    const formatDateToISO = (date) => {
        if (!date) return null
        const year = date.getFullYear()
        const month = monthNameToNumber(date.toLocaleString("en-US", { month: "short" })).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    async function bookReservation() {
        setBookingReservation(true)
        try {
            const response = await fetch("http://localhost:5000/" + "listing/bookReservation", {
                method: "POST",
                body: JSON.stringify({
                    listingId: listingId,
                    userId: auth.userId,
                    userFirstName: auth.firstName,
                    userLastName: auth.lastName,
                    startDate: formatDateToISO(selectedStartDate),
                    endDate: formatDateToISO(selectedEndDate),
                }),
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + auth.token,
                },
            })

            const data = await response.json()
            if (data.error) {
                setErrorModalMessage(data.error.message)
            }
            else if (data.success) {
                setBookingSuccess(true)

                setTimeout(() => {
                    navigate("/")
                    window.location.reload()
                }, 1000)
            }
        }
        catch (error) {
            setErrorModalMessage("An error occurred during the booking process.")
        }

        setBookingReservation(false)
    }

    function place(placeTerm) {
        if (placeTerm === "entirePlace") return "Entire Place"
        if (placeTerm === "privateRoom") return "Private Room"
        if (placeTerm === "sharedRoom") return "Shared Room"
    }

    useEffect(() => {
        if (!searchParams) return

        const startDate = new Date(searchParams.get("start"))
        const endDate = new Date(searchParams.get("end"))
        const totalDays = parseInt(searchParams.get("totalDays"))

        if (totalDays <= 0) {
            navigate(`/listing/${listingId}`)
            return
        }

        const newEndDate = new Date(startDate.getTime() + (totalDays - 1) * 24 * 60 * 60 * 1000)

        if (endDate !== newEndDate) {
            setSelectedEndDate(newEndDate)
            searchParams.set("end", formatDate(newEndDate))
            window.history.replaceState(null, "", `?${searchParams.toString()}`)
        }
    }, [searchParams, listingId, navigate])

    return (
        <div className="checkoutContainer">
            {errorModalMessage && (
                <ErrorModal
                    errors={[errorModalMessage]}
                    closeModal={() => setErrorModalMessage(null)}
                />
            )}
            <div className="checkoutHeader">
                <img src={airbnbLogo} className="checkoutHeaderImage" onClick={() => navigate("/")}/>
            </div>
            <div className="checkoutHeaderMedia">
                <div className="checkoutMediaBackIconContainer" onClick={() => navigate('/listing/' + listingId)}>
                    <i class="fa-solid fa-chevron-left checkoutMediaBackIcon"></i>
                </div>
                <p className="checkoutMediaConfirmText">Confirm and pay</p>
                <img src={airbnbLogo} className="checkoutHeaderImageMedia" onClick={() => navigate("/")}/>
            </div>

            <div className="checkoutContainerLeft">

                <div className="checkoutListingContainer">
                    <div className="checkoutListingContainerUpper">
                        <div className="checkoutListingContainerUpperLeft">
                            <img src={(listing && !fetchingListing) ? ("https://airebnb.s3.us-east-2.amazonaws.com/" + listing.imageIds[0]) : null} className="checkoutListingContainerUpperLeftImage"/>
                        </div>
                        <div className="checkoutListingContainerUpperRight">
                            <p className="checkoutListingContainerUpperRightText1">{(!fetchingListing && listing) && place(listing.placeGeneralData.placeSize)}</p>
                            <p className="checkoutListingContainerUpperRightText2">{(!fetchingListing && listing) && listing.placeGeneralData.placeTitle}</p>
                            <div className="checkoutListingContainerUpperRightTextContainer">
                                <i className="fa-solid fa-star checkoutListingContainerUpperRightTextContainerIcon"></i>
                                <p className="checkoutListingContainerUpperRightText3">{(!fetchingListing && listing) && averageRating}</p>
                                <p className="checkoutListingContainerUpperRightText4">{(!fetchingListing && listing) && `(${listing.reviewsData.reviewsCount} ${listing.reviewsData.reviewsCount === 1 ? "Review" : "Reviews"})`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkoutListingContainerLower">
                        <p className="checkoutListingContainerLowerText">Your booking is protected by </p>
                        <img src={aircover} className="checkoutListingContainerLowerPic"/>
                    </div>
                </div>

                <div className="checkoutTitleContainer">
                    <div className="checkoutTitleIconContainer" onClick={() => navigate('/listing/' + listingId)}>
                        <i className="fa-solid fa-chevron-left checkoutTitleIcon"></i>
                    </div>
                    <p className="checkoutTitle">Confirm and pay</p>
                </div>
                <div className="checkoutYourTripContainer">
                    <p className="checkoutYourTripText">Your trip</p>
                    <div className="checkoutYourTripStatContainer">
                        <p className="checkoutYourTripStat1">Dates</p>
                        <p className="checkoutYourTripStat2">{formatDate(selectedStartDate) + " - " + formatDate(selectedEndDate)}</p>
                    </div>
                    <div className="checkoutYourTripStatContainer">
                        <p className="checkoutYourTripStat1">Guests</p>
                        <p className="checkoutYourTripStat2">{(adultsCounter + childrenCounter) + (adultsCounter + childrenCounter <= 1 ? " guest, " : " guests, ") + (infantsCounter) + " infants, " + (petCounter) + " pets"}</p>
                    </div>
                </div>
                <div className="checkoutChoosePaymentContainer">
                    <p className="checkoutChoosePaymentText">Choose how to pay</p>
                    <div className="checkoutPayInFullConainer">
                        <div className="checkoutPayInFullUpper">
                            <p className="checkoutPayInFullText1">Pay in full</p>
                            <div className="checkoutPayInFullUpperRight">
                                <p className="checkoutPayInFullUpperRightAmount">{(listing && !fetchingListing) && ["$", (((listing.placePriceData.priceCounter * totalDays) + listing.placePriceData.cleaningFee + listing.placePriceData.airbnbFee) * 1.07).toFixed(2)]}</p>
                                <div className="leftCircleContainer">
                                    <div className="leftCircleMid">
                                        <div className="leftCircleLast"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="checkoutPayInFullText2">Pay the total now and you're all set.</p>
                    </div>
                </div>
                <div className="checkoutPaymentInfoContainer">
                    <div className="checkoutPayementInfoHeader">
                        <p className="checkoutPaymentInfoText">Pay with</p>
                        <div className="checkoutPaymentInfoImages">
                            <img className="checkoutPaymentInfoImage" src={visaLogo}></img>
                            <img className="checkoutPaymentInfoImage" src={amexLogo}></img>
                            <img className="checkoutPaymentInfoImage" src={mastercardLogo}></img>
                            <img className="checkoutPaymentInfoImage" src={discoverLogo}></img>
                        </div>
                    </div>
                    <div className="checkoutPaymentContainer1">
                        <i className="fa-regular fa-credit-card"></i>
                        <p className="checkoutPaymentContainerText">Credit or debit card</p>
                    </div>
                    <div className="checkoutPaymentContainer2">
                        <div className="checkoutPaymentContainer2Upper">
                            <p className="checkoutPaymentContainerSubText">Card number</p>
                            <p className="checkoutPaymentContainerText">0000 0000 0000 0000</p>
                        </div>
                        <div className="checkoutPaymentContainer2Lower">
                            <div className="checkoutPaymentContainer2LowerLeft">
                                <p className="checkoutPaymentContainerSubText">Expiration</p>
                                <p className="checkoutPaymentContainerText">00 / 00</p>
                            </div>
                            <div className="checkoutPaymentContainer2LowerRight">
                                <p className="checkoutPaymentContainerSubText">CVV</p>
                                <p className="checkoutPaymentContainerText">000</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkoutPaymentContainer3">
                        <p className="checkoutPaymentContainerSubText">ZIP code</p>
                        <p className="checkoutPaymentContainerText">00000</p>
                    </div>
                    <div className="checkoutPaymentContainer4">
                        <p className="checkoutPaymentContainerSubText">Country/region</p>
                        <p className="checkoutPaymentContainerText">United States</p>
                    </div>
                </div>
                <div className="checkoutCancellationPolicyContainer">
                    <p className="checkoutCancellationPolicyText1">Cancellation Policy</p>
                    <p className="checkoutCancellationPolicyText2">Free cancellation for 48 hours.</p>
                </div>
                <div className="checkoutButtonContainer">
                    <button className={!bookingSuccess ? "checkoutButton" : "checkoutButton2"} onClick={(!fetchingListing && listing) ? bookReservation : null}>{!bookingSuccess ? "Confirm and pay" : "Success!"}</button>
                </div>
            </div>
            <div className="checkoutContainerRight">
                <div className="checkoutContainerRightCard">
                    <div className="checkoutContainerRightCard1">
                        <div className="checkoutContainerRightCard1Left">
                            <img src={(listing && !fetchingListing) ? ("https://airebnb.s3.us-east-2.amazonaws.com/" + listing.imageIds[0]) : null} className="checkoutContainerRightCard1Pic"/>
                        </div>
                        <div className="checkoutContainerRightCard1Right">
                            <p className="checkoutContainerRightCard1RightText1">{(!fetchingListing && listing) && place(listing.placeGeneralData.placeSize)}</p>
                            <p className="checkoutContainerRightCard1RightText2">{(!fetchingListing && listing) && listing.placeGeneralData.placeTitle}</p>
                            <div className="checkoutContainerRightCard1RightTextContainer">
                                <i className="fa-solid fa-star checkoutContainerRightCard1RightTextContainerIcon"></i>
                                <p className="checkoutContainerRightCard1RightText3">{(!fetchingListing && listing) && averageRating}</p>
                                <p className="checkoutContainerRightCard1RightText4">{(!fetchingListing && listing) && `(${listing.reviewsData.reviewsCount} ${listing.reviewsData.reviewsCount === 1 ? "Review" : "Reviews"})`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkoutContainerRightCard2">
                        <p className="checkoutContainerRightCard2Text">Your booking is protected by </p>
                        <img src={aircover} className="checkoutContainerRightCard2Pic"/>
                    </div>
                    <div className="checkoutContainerRightCard3">
                        <div className="checkoutContainerRightCard3Title">
                            <p className="checkoutContainerRightCard3TitleText">Price details</p>
                        </div>
                        <div className="checkoutContainerRightCard3Body">
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">{(listing && !fetchingListing) && ["$", listing.placePriceData.priceCounter, " x ", totalDays, " nights"]}</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">{(listing && !fetchingListing) && ["$", (listing.placePriceData.priceCounter * totalDays).toFixed(2)]}</p>
                            </div>
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">Cleaning fee</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">{(listing && !fetchingListing) && ["$", listing.placePriceData.cleaningFee.toFixed(2)]}</p>
                            </div>
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">Airbnb service fee</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">{(listing && !fetchingListing) && ["$", listing.placePriceData.airbnbFee.toFixed(2)]}</p>
                            </div>
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">Taxes</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">{(listing && !fetchingListing) && ["$", (((listing.placePriceData.priceCounter * totalDays) + listing.placePriceData.cleaningFee + listing.placePriceData.airbnbFee) * 0.07).toFixed(2)]}</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkoutContainerRightCard4">
                        <p className="checkoutContainerRightCard4TotalText">Total (USD)</p>
                        <p className="checkoutContainerRightCard4TotalAmount">{(listing && !fetchingListing) && ["$", (((listing.placePriceData.priceCounter * totalDays) + listing.placePriceData.cleaningFee + listing.placePriceData.airbnbFee) * 1.07).toFixed(2)]}</p>
                    </div>
                </div>
            </div>

            <div className="homeFooterContainer bottom">
                <p className="homeFooterText">© 2023 Airebnb, Inc.</p>
                <i className="fa-brands fa-linkedin" onClick={toLinkedInProfile}></i>
            </div>
        </div>
    )
}

export default Checkout
