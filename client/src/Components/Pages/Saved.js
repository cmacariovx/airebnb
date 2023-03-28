import React, { useState, useEffect, useRef, useContext } from "react"
import { Ripples } from '@uiball/loaders'

import './Saved.css'
import logo from '../../Images/airbnbLogoMain.png'
import personalPic from '../../Images/personalPic.jpg'
import ListingCard from "../Sub-Components/ListingCard"

import { useNavigate } from "react-router"

import { AuthContext } from "../../Context/Auth-Context"

function Saved() {
    const [activeProfileDropdown, setActiveProfileDropdown] = useState(false)
    const [fetchingListings, setFetchingListings] = useState(false)
    const [listings, setListings] = useState([])

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

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

    async function fetchSavedListings() {
        setFetchingListings(true)

        const response = await fetch("http://localhost:5000/" + "listing/fetchSavedListings", {
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
            setListings(data.listings)
        }

        setFetchingListings(false)
        return data
    }

    useEffect(() => {
        if (auth.token) fetchSavedListings()
    }, [])

    return (
        <div className="savedContainer">
            <header className="savedHeaderContainer">
                <img src={logo} className="savedHeaderLogo" onClick={() => navigate("/")}/>
                <div className="savedProfileContainer" onClick={() => setActiveProfileDropdown(true)}>
                    <img src={"https://airebnb.s3.us-east-2.amazonaws.com/" + auth.profilePicture} className="savedProfilePic"/>
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
            <p className="savedTitle">Saved Listings</p>
            <div className="savedBodyContainer">
                {(!fetchingListings && listings.length > 0) && listings.map((listing, index) => (
                    <ListingCard listing={listing}/>
                ))}
                {(!fetchingListings && listings.length === 0) && <p className="emptyListingsText">You don't have any listings saved.</p>}
            </div>
        </div>
    )
}

export default Saved
