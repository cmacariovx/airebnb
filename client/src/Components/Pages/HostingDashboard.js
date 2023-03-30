import React, { useState, useEffect, useRef, useContext } from "react"
import { Ripples } from '@uiball/loaders'

import './HostingDashboard.css'

import ListingCard from "../Sub-Components/ListingCard"
import logo from '../../Images/airbnbLogoMain.png'
import personalPic from '../../Images/personalPic.jpg'
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Auth-Context";
import Footer2 from "../Sub-Components/Footer2"

function HostingDashboard() {
    const [activeProfileDropdown, setActiveProfileDropdown] = useState(false)
    const [fetchingListings, setFetchingListings] = useState(false)
    const [user, setUser] = useState(null)
    const [listings, setListings] = useState([])
    const [checkOutToday, setCheckOutToday] = useState([])
    const [currentlyHosting, setCurrentlyHosting] = useState([])
    const [arrivingSoon, setArrivingSoon] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [showCheckout, setShowCheckout] = useState(true)
    const [showHosting, setShowHosting] = useState(false)
    const [showArriving, setShowArriving] = useState(false)
    const [showUpcoming, setShowUpcoming] = useState(false)

    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const profileDropdownRef = useRef()

    const handleClickOutside = (event) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
            setActiveProfileDropdown(false)
        }
    }

    async function fetchPersonalListings() {
        setFetchingListings(true)
        const response = await fetch("http://localhost:5000/" + "listing/fetchPersonalListings", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })

        const data = await response.json()

        if (!data.error) {
            setUser(data.user)
            setListings(data.user.listings)
        }

        setFetchingListings(false)
        return data
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        fetchPersonalListings()
    }, [])

    useEffect(() => {
        if (listings && listings.length > 0) {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            const categorizedBookings = listings.reduce(
                (categories, listing) => {
                    listing.bookings.forEach((booking) => {
                    const startDate = new Date(booking.startDate)
                    const endDate = new Date(booking.endDate)

                    if (endDate.toDateString() === today.toDateString()) {
                        categories.checkOutToday.push({ ...booking, listing })
                    }
                    else if (startDate <= today && endDate > today) {
                        categories.currentlyHosting.push({ ...booking, listing })
                    }
                    else if (
                        startDate.toDateString() === today.toDateString() ||
                        startDate.toDateString() === tomorrow.toDateString()
                    ) {
                        categories.arrivingSoon.push({ ...booking, listing })
                    }
                    else if (startDate > tomorrow) {
                        categories.upcoming.push({ ...booking, listing })
                    }
                    })

                    return categories
                },
                {
                    checkOutToday: [],
                    currentlyHosting: [],
                    arrivingSoon: [],
                    upcoming: [],
                }
            )

            setCheckOutToday(categorizedBookings.checkOutToday)
            setCurrentlyHosting(categorizedBookings.currentlyHosting)
            setArrivingSoon(categorizedBookings.arrivingSoon)
            setUpcoming(categorizedBookings.upcoming)
        }
    }, [listings])

    function getListingTitleById(listingId) {
        const listing = listings.find(listing => listing._id === listingId)
        return listing ? listing.placeGeneralData.placeTitle : 'Unknown'
    }

    function setShowState(targetSetter) {
        const arr = [
            { state: showArriving, setter: setShowArriving },
            { state: showCheckout, setter: setShowCheckout },
            { state: showHosting, setter: setShowHosting },
            { state: showUpcoming, setter: setShowUpcoming },
        ]

        arr.forEach((el) => {
            if (el.setter !== targetSetter) el.setter(false)
            else el.setter(true)
        })
    }

    return (
        <div className="hostingDashboardContainer">
            <Footer2 />
            <header className="hostingDashboardHeaderContainer">
                <img src={logo} className="hostingDashboardHeaderLogo" onClick={() => navigate("/")}/>
                <div className="hostingDashboardProfileContainer" onClick={() => setActiveProfileDropdown(true)}>
                    <img src={"https://airebnb.s3.us-east-2.amazonaws.com/" + auth.profilePicture}  className="hostingDashboardProfilePic"/>
                </div>
                {activeProfileDropdown && <div className='homeHeaderProfileDropdownContainer2' ref={profileDropdownRef}>
                    {auth.isLoggedIn &&
                        <React.Fragment>
                            <div className='homeHeaderProfileDropdownOption' onClick={() => navigate("/profile/" + auth.userId)}>
                                <p className='homeHeaderProfileDropdownOptionText'>Profile</p>
                            </div>
                            <div className='homeHeaderProfileDropdownOption'>
                                <p className='homeHeaderProfileDropdownOptionText'>Saved</p>
                            </div>
                            <div className='homeHeaderProfileDropdownOption' onClick={() => auth.logout()}>
                                <p className='homeHeaderProfileDropdownOptionText'>Log out</p>
                            </div>
                        </React.Fragment>
                    }
                </div>}
            </header>
            <div className="hostingDashboardWelcomeContainer">
                <p className="hostingDashboardWelcomeText">{"Welcome back, " + auth.firstName}</p>
                <div className="hostingDashboardWelcomeOptionsContainer">
                    <div className="hostingDashboardWelcomeOption" onClick={() => navigate("/createListing/0")}>
                        <p className="hostingDashboardWelcomeOptionHeader">Create a new listing</p>
                    </div>
                </div>
            </div>
            <div className="hostingDashboardReservationsContainer">
                <p className="hostingDashboardReservationsTitle">Your reservations</p>
                <div className="hostingDashboardReservationsButtons">
                    <button className="hostingDashboardReservationsButton" onClick={() => setShowState(setShowCheckout)}>Checking out ({checkOutToday.length})</button>
                    <button className="hostingDashboardReservationsButton" onClick={() => setShowState(setShowHosting)}>Currently hosting ({currentlyHosting.length})</button>
                    <button className="hostingDashboardReservationsButton" onClick={() => setShowState(setShowArriving)}>Arriving soon ({arrivingSoon.length})</button>
                    <button className="hostingDashboardReservationsButton" onClick={() => setShowState(setShowUpcoming)}>Upcoming ({upcoming.length})</button>
                </div>
                {showCheckout && (checkOutToday.length === 0 ? (
                    <div className="hostingDashboardReservationsOptionsContainer2">
                        <div className="hostingDashboardReservationsOptionContainerEmpty">
                            <p className="hostingDashboardReservationsOptionText2">
                                You don't have any guests checking out.
                            </p>
                        </div>
                    </div>
                    ) : (
                    checkOutToday.map((booking, index) => (
                        <div className="hostingDashboardReservationsOptionsContainer" key={index}>
                            <div className="hostingDashboardReservationsOptionContainer">
                                <p className="hostingDashboardReservationsOptionText">
                                    {booking.userFirstName} is checking out of {getListingTitleById(booking.listingId)} today.
                                </p>
                            </div>
                        </div>
                    ))
                ))}

                {showHosting && (currentlyHosting.length === 0 ? (
                    <div className="hostingDashboardReservationsOptionsContainer2">
                        <div className="hostingDashboardReservationsOptionContainerEmpty">
                            <p className="hostingDashboardReservationsOptionText2">
                                You don't have any guests currently hosting.
                            </p>
                        </div>
                    </div>
                    ) : (
                    currentlyHosting.map((booking, index) => (
                        <div className="hostingDashboardReservationsOptionsContainer" key={index}>
                            <div className="hostingDashboardReservationsOptionContainer">
                                <p className="hostingDashboardReservationsOptionText">
                                    You are currently hosting {booking.userFirstName} at {getListingTitleById(booking.listingId)}.
                                </p>
                            </div>
                        </div>
                    ))
                ))}

                {showArriving && (arrivingSoon.length === 0 ? (
                    <div className="hostingDashboardReservationsOptionsContainer2">
                        <div className="hostingDashboardReservationsOptionContainerEmpty">
                            <p className="hostingDashboardReservationsOptionText2">
                                You don't have any guests arriving soon.
                            </p>
                        </div>
                    </div>
                    ) : (
                    arrivingSoon.map((booking, index) => (
                        <div className="hostingDashboardReservationsOptionsContainer" key={index}>
                            <div className="hostingDashboardReservationsOptionContainer">
                                <p className="hostingDashboardReservationsOptionText">
                                    {booking.userFirstName} is arriving at {getListingTitleById(booking.listingId)} soon.
                                </p>
                            </div>
                        </div>
                    ))
                ))}

                {showUpcoming && (upcoming.length === 0 ? (
                    <div className="hostingDashboardReservationsOptionsContainer2">
                        <div className="hostingDashboardReservationsOptionContainerEmpty">
                            <p className="hostingDashboardReservationsOptionText2">
                                You don't have any upcoming reservations.
                            </p>
                        </div>
                    </div>
                    ) : (
                    upcoming.map((booking, index) => (
                        <div className="hostingDashboardReservationsOptionsContainer" key={index}>
                            <div className="hostingDashboardReservationsOptionContainer">
                                <p className="hostingDashboardReservationsOptionText">
                                    {booking.userFirstName} has an upcoming reservation at {getListingTitleById(booking.listingId)}.
                                </p>
                            </div>
                        </div>
                    ))
                ))}
            </div>
            <div className="hostingDashboardListingsContainer">
                <p className="hostingDashboardListingsTitle">Your listings</p>
                <div className="hostingDashboardListings">
                    {(fetchingListings && listings.length === 0) &&
                        <div className="homeBodySpinnerContainer2">
                            <Ripples size={100} color="#c9c9c9" />
                        </div>
                    }
                    {(!fetchingListings && listings.length > 0) && listings.map((listing, index) => (
                        <div key={index} className="hostingDashboardListingContainer">
                            <ListingCard key={listing._id} listing={listing} isSaved={user && user.saved.includes(listing._id.toString())} />
                        </div>
                    ))}
                    {(!fetchingListings && listings.length === 0) && "You don't have any listings."}
                </div>
            </div>
        </div>
    )
}

export default HostingDashboard
