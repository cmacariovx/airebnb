import React, { useState, useEffect, useRef, useContext } from "react";

import './HostingDashboard.css'

import ListingCard from "../Sub-Components/ListingCard"
import logo from '../../Images/airbnbLogoMain.png'
import personalPic from '../../Images/personalPic.jpg'
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Auth-Context";

function HostingDashboard() {
    const [activeProfileDropdown, setActiveProfileDropdown] = useState(false)
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const profileDropdownRef = useRef()

    const handleClickOutside = (event) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
            setActiveProfileDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="hostingDashboardContainer">
            <header className="hostingDashboardHeaderContainer">
                <img src={logo} className="hostingDashboardHeaderLogo" onClick={() => navigate("/")}/>
                <div className="hostingDashboardProfileContainer" onClick={() => setActiveProfileDropdown(true)}>
                    <img src={personalPic} className="hostingDashboardProfilePic"/>
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
                    <button className="hostingDashboardReservationsButton">Checking out (0)</button>
                    <button className="hostingDashboardReservationsButton">Currently hosting (0)</button>
                    <button className="hostingDashboardReservationsButton">Arriving soon (0)</button>
                    <button className="hostingDashboardReservationsButton">Upcoming (0)</button>
                </div>
                <div className="hostingDashboardReservationsOptionsContainer">
                    <div className="hostingDashboardReservationsOptionContainer">
                        <p className="hostingDashboardReservationsOptionText">Carlos is checking out of Modern Mansion today.</p>
                    </div>
                </div>
                {/* <div className="hostingDashboardReservationsOptionsContainer2">
                    <div className="hostingDashboardReservationsOptionsContainerEmpty">
                        <i className="fa-regular fa-circle-check hostingDashboardReservationsOptionsContainerEmptyCheck"></i>
                        <p className="hostingDashboardReservationsOptionsContainerEmptyText">You don’t have any guests checking out today or tomorrow.</p>
                    </div>
                </div> */}
            </div>
            <div className="hostingDashboardListingsContainer">
                <p className="hostingDashboardListingsTitle">Your listings</p>
                <div className="hostingDashboardListings">
                    {/* <div className="hostingDashboardListingContainer">
                        <ListingCard/>
                    </div>
                    <div className="hostingDashboardListingContainer">
                        <ListingCard/>
                    </div>
                    <div className="hostingDashboardListingContainer">
                        <ListingCard/>
                    </div>
                    <div className="hostingDashboardListingContainer">
                        <ListingCard/>
                    </div>
                    <div className="hostingDashboardListingContainer">
                        <ListingCard/>
                    </div>
                    <div className="hostingDashboardListingContainer">
                        <ListingCard/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default HostingDashboard
