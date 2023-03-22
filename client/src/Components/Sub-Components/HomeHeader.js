import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router"

import './HomeHeader.css'

import airbnbLogo from '../../Images/airbnbLogo.png'
import personalPic from '../../Images/personalPic.jpg'

import Calendar from './Calendar'

function HomeHeader(props) {
    const homePage = props.homePage
    const profilePage = props.profilePage ? props.profilePage : null

    const [currentPlace, setCurrentPlace] = useState("")

    const [searchHeaderOpen, setSearchHeaderOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [autocompleteService, setAutocompleteService] = useState(null)

    const [activeDropdown, setActiveDropdown] = useState(null)

    const [activeProfileDropdown, setActiveProfileDropdown] = useState(false)

    const handleWhereClick = () => {
        setActiveDropdown("where")
    }

    const handleCheckInClick = () => {
        setActiveDropdown("checkIn")
    }

    const handleCheckOutClick = () => {
        setActiveDropdown("checkOut")
    }

    const handleWhoClick = () => {
        setActiveDropdown("who")
    }

    const navigate = useNavigate()
    const inputRef = useRef()

    const handleScriptLoad = () => {
        if (window.google) {
            setAutocompleteService(new window.google.maps.places.AutocompleteService())
        }
    }

    const searchPlaces = (input) => {
        if (autocompleteService && input) {
            autocompleteService.getPlacePredictions({ input, types: ['(regions)'], componentRestrictions: { country: 'us' } }, setSearchResults)
        }
        else {
            setSearchResults([])
        }
    }

    function setPlace(place) {
        setCurrentPlace(place)
        inputRef.current.value = place
    }

    useEffect(() => {
        handleScriptLoad()
    }, [])

    function toHomeHandler() {
        if (homePage) {
            navigate("/")
            window.location.reload()
        }
        else {
            navigate("/")
        }
    }

    const calendarRef = useRef()

    const handleClearDates = () => {
        if (calendarRef.current) {
            calendarRef.current.clearDates()
        }
    }

    const profileDropdownRef = useRef()

    const handleClickOutside = (event) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
            setActiveProfileDropdown(false)
        }
    }

    const debounce = (func, delay) => {
        let debounceTimer
        return (...args) => {
            const context = this
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => func.apply(context, args), delay)
        }
    }

    const debouncedSearchPlaces = debounce(searchPlaces, 300)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleScroll = () => {
        setSearchHeaderOpen(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className={homePage ? "homeHeaderContainer" : "homeHeaderContainerListing"}>
            <div className={homePage ? "homeHeader1Container" : "homeHeader1Container2"}>
                <div className="homeHeader1LogoContainer">
                    <img src={airbnbLogo} className="homeHeader1Logo" onClick={toHomeHandler}/>
                </div>
                <div className="homeHeader1SearchContainer">
                    {(homePage && !profilePage) && <div className="homeHeader1Search" onClick={() => setSearchHeaderOpen(true)}>
                        <div className="homeHeader1AnywhereContainer">
                            <p className="homeHeader1SearchText1">Anywhere</p>
                        </div>
                        <div className="homeHeader1AnyWeekContainer">
                            <p className="homeHeader1SearchText1">Any week</p>
                        </div>
                        <div className="homeHeader1AddGuestsContainer">
                            <p className="homeHeader1SearchText2">Add guests</p>
                        </div>
                        <div className="homeHeader1SearchButtonContainer">
                            <i className="fa-solid fa-magnifying-glass homeHeader1SearchButton"></i>
                        </div>
                    </div>}
                    {(!homePage && !profilePage) && <div className="homeHeader2Search" onClick={() => setSearchHeaderOpen(true)}>
                        <div className="homeHeader1StartSearchContainer">
                            <p className="homeHeader1StartSearchText">Start your search</p>
                        </div>
                        <div className="homeHeader1SearchButtonContainer">
                            <i className="fa-solid fa-magnifying-glass homeHeader1SearchButton"></i>
                        </div>
                    </div>}
                </div>
                <div className="homeHeader1RightContainer">
                    <div className="homeHeader1AddHomeContainer" onClick={() => navigate("/hostingDashboard")}>
                        <p className="homeHeader1AddHomeText">Airbnb your home</p>
                    </div>
                    <div className="homeHeader1UserContainer" onClick={() => setActiveProfileDropdown(true)}>
                        <i className="fa-solid fa-bars homeHeader1UserMenuBars"></i>
                        <img src={personalPic} className="homeHeader1UserPicture"></img>
                    </div>
                </div>
                {activeProfileDropdown && <div className='homeHeaderProfileDropdownContainer' ref={profileDropdownRef}>
                    <div className='homeHeaderProfileDropdownOption'>
                        <p className='homeHeaderProfileDropdownOptionText'>Profile</p>
                    </div>
                    <div className='homeHeaderProfileDropdownOption'>
                        <p className='homeHeaderProfileDropdownOptionText'>Saved</p>
                    </div>
                    <div className='homeHeaderProfileDropdownOption'>
                        <p className='homeHeaderProfileDropdownOptionText'>Log out</p>
                    </div>
                </div>}
            </div>
            {homePage && !searchHeaderOpen && <div className="homeHeader2Container">
                <div className="homeHeader2CategoriesContainer">
                    <div className="homeHeader2CategoryContainer">
                        <i className="fa-solid fa-umbrella-beach homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Beachfront</p>
                    </div>
                    <div className="homeHeader2CategoryContainer">
                        <i className="fa-solid fa-mountain homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Amazing Views</p>
                    </div>
                    <div className="homeHeader2CategoryContainer1">
                        <i className="fa-solid fa-tree homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Treehouses</p>
                    </div>
                    <div className="homeHeader2CategoryContainer2">
                        <i className="fa-solid fa-fire homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Trending</p>
                    </div>
                </div>
            </div>}
            {(homePage || !profilePage) && searchHeaderOpen && <div className="homeHeader2SearchDropdownContainer">
                <div className="homeHeader2SearchDropdown">
                    <div className="homeHeader2SearchDropdownWhere" onClick={handleWhereClick}>
                        <p className="homeHeader2SearchDropdownSubHeader">Where</p>
                        <input ref={inputRef}
                            className="homeHeader2SearchDropdownSubInput"
                            placeholder="Search destinations"
                            onChange={(e) => debouncedSearchPlaces(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className="homeHeader2SearchDropdownCheckIn" onClick={handleCheckInClick}>
                        <p className="homeHeader2SearchDropdownSubHeader">Check in</p>
                        <p className="homeHeader2SearchDropdownSubText">Add dates</p>
                    </div>
                    <div className="homeHeader2SearchDropdownCheckOut" onClick={handleCheckOutClick}>
                        <p className="homeHeader2SearchDropdownSubHeader">Check out</p>
                        <p className="homeHeader2SearchDropdownSubText">Add dates</p>
                    </div>
                    <div className="homeHeader2SearchDropdownWho" onClick={handleWhoClick}>
                        <p className="homeHeader2SearchDropdownSubHeader">Who</p>
                        <p className="homeHeader2SearchDropdownSubText">Add guests</p>
                    </div>
                    <div className="homeHeader2SearchDropdownSearchContainer">
                        <i className="fa-solid fa-magnifying-glass homeHeader2SearchDropdownSearchIcon"></i>
                    </div>
                </div>
                <div className="homeHeader2SearchDropdownBackdrop" onClick={() => setSearchHeaderOpen(false)}></div>
                {activeDropdown === "where" && searchResults && searchResults.length > 0 && <div className="homeHeader2SearchDropdownPlacesContainer">
                    {searchResults.map((result, index) => (
                        <div key={index} className="homeHeader2SearchDropdownPlaceContainer" onClick={() => setPlace(result.description)}>
                            <i className="fa-solid fa-location-dot homeHeader2SearchDropdownPlaceIcon"></i>
                            <p className="homeHeader2SearchDropdownPlaceText">{result.description}</p>
                        </div>
                    ))}
                </div>}
                {activeDropdown === "checkIn" || activeDropdown === "checkOut" ? <div className="homeHeader2SearchDropdownCalendarsContainer">
                    <div className="homeHeader2SearchDropdownCalendars">
                        <Calendar ref={calendarRef}/>
                    </div>
                    <div className="listingBodyMainLeftCalendarFooterTextContainer2" onClick={handleClearDates}>
                        <p className="listingBodyMainLeftCalendarFooterText2">Clear dates</p>
                    </div>
                </div> : null}
                {activeDropdown === "who" && <div className="homeHeader2SearchDropdownGuestsContainer">
                    <div className='homeHeader2SearchDropdownGuestContainer'>
                        <div className='homeHeader2SearchDropdownGuestContainerLeft'>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText1'>Adults</p>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText2'>Ages 13 or above</p>
                        </div>
                        <div className='homeHeader2SearchDropdownGuestContainerRight'>
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>0</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>+</p>
                            </div>
                        </div>
                    </div>
                    <div className='homeHeader2SearchDropdownGuestContainer'>
                        <div className='homeHeader2SearchDropdownGuestContainerLeft'>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText1'>Children</p>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText2'>Ages 2-12</p>
                        </div>
                        <div className='homeHeader2SearchDropdownGuestContainerRight'>
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>0</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>+</p>
                            </div>
                        </div>
                    </div>
                    <div className='homeHeader2SearchDropdownGuestContainer'>
                        <div className='homeHeader2SearchDropdownGuestContainerLeft'>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText1'>Infants</p>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText2'>Under 2</p>
                        </div>
                        <div className='homeHeader2SearchDropdownGuestContainerRight'>
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>0</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>+</p>
                            </div>
                        </div>
                    </div>
                    <div className='homeHeader2SearchDropdownGuestContainer2'>
                        <div className='homeHeader2SearchDropdownGuestContainerLeft'>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText1'>Pets</p>
                            <p className='homeHeader2SearchDropdownGuestContainerLeftText2'>Service Animals Included</p>
                        </div>
                        <div className='homeHeader2SearchDropdownGuestContainerRight'>
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>0</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer'>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>+</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default HomeHeader
