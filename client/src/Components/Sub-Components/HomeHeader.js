import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import { useNavigate } from "react-router"
import { useSearchParams } from 'react-router-dom'

import './HomeHeader.css'

import airbnbLogo from '../../Images/airbnbLogo.png'
import personalPic from '../../Images/personalPic.jpg'

import Signup from '../Pages/Signup'
import Calendar from './Calendar'
import Login from '../Pages/Login'
import ErrorModal from './ErrorModal'

import { AuthContext } from '../../Context/Auth-Context'

function HomeHeader(props) {
    const homePage = props.homePage
    const profilePage = props.profilePage ? props.profilePage : null

    const auth = useContext(AuthContext)

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const [city, setCity] = useState(searchParams.get("city") || "")
    const [state, setState] = useState(searchParams.get("state") || "")
    const [adults, setAdults] = useState(searchParams.get("adults") || "")
    const [children, setChildren] = useState(searchParams.get("children") || "")
    const [infants, setInfants] = useState(searchParams.get("infants") || "")
    const [pets, setPets] = useState(searchParams.get("pets") || "")
    const [selectedStartDate, setSelectedStartDate] = useState(searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null)
    const [selectedEndDate, setSelectedEndDate] = useState(searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null)

    const [adultsCounter, setAdultsCounter] = useState(+searchParams.get("adults") || 0)
    const [childrenCounter, setChildrenCounter] = useState(+searchParams.get("children") || 0)
    const [infantsCounter, setInfantsCounter] = useState(+searchParams.get("infants") || 0)
    const [petCounter, setPetCounter] = useState(+searchParams.get("pets") || 0)


    const [showSignup, setShowSignup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    function showSignupHandler() {
        if (showLogin) setShowLogin(false)
        setShowSignup(true)
    }

    function showLoginHandler() {
        if (showSignup) setShowSignup(false)
        setShowLogin(true)
    }

    const handleDateChange = (startDate, endDate) => {
        if (startDate && endDate && startDate > endDate) {
            [startDate, endDate] = [endDate, startDate]
        }

        setSelectedStartDate(startDate)
        setSelectedEndDate(endDate)
    }


    function closeSignup() {
        setShowSignup(false)
    }

    function closeLogin() {
        setShowLogin(false)
    }

    const showError = (errors) => {
        setErrorMessages(errors)
        setShowErrorModal(true)
    }

    const closeModal = () => {
        setShowErrorModal(false)
        setErrorMessages([])
    }

    const formatDate = (date) => {
        if (!date) return "Not selected"
        const month = date.toLocaleString("en-US", { month: "short" })
        const day = date.getDate()
        return `${month} ${day}`
    }

    function increment(counter, operator) {
        if (counter === 'adults') {
            if (operator === "-" && adultsCounter > 0) setAdultsCounter((prev) => prev - 1)
            if (operator === "+" && adultsCounter < 10) setAdultsCounter((prev) => prev + 1)
        }
        if (counter === 'children') {
            if (operator === "-" && childrenCounter > 0) setChildrenCounter((prev) => prev - 1)
            if (operator === "+" && childrenCounter < 10) setChildrenCounter((prev) => prev + 1)
        }
        if (counter === 'infants') {
            if (operator === "-" && infantsCounter > 0) setInfantsCounter((prev) => prev - 1)
            if (operator === "+" && infantsCounter < 10) setInfantsCounter((prev) => prev + 1)
        }
        if (counter === 'pets') {
            if (operator === "-" && petCounter > 0) setPetCounter((prev) => prev - 1)
            if (operator === "+" && petCounter < 10) setPetCounter((prev) => prev + 1)
        }
    }

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
        const cityState = place.split(", ")
        setCity(cityState[0])
        setState(cityState[1])
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

    function searchHandler() {
        let valid = true
        if (!city) {
            setErrorMessages(prev => [...prev, "Choose a *city* from our Autocomplete list."])
            valid = false
        }
        if (!selectedStartDate) {
            setErrorMessages(prev => [...prev, "Must select a start date."])
            valid = false
        }
        if (!selectedEndDate) {
            setErrorMessages(prev => [...prev, "Must select an end date."])
            valid = false
        }
        if (adultsCounter < 1) {
            setErrorMessages(prev => [...prev, "At least 1 adult must be present."])
            valid = false
        }

        if (!valid) {
            setShowErrorModal(true)
            return
        }

        setSearchParams({
            city: city,
            state: state,
            startDate: selectedStartDate ? selectedStartDate : "",
            endDate: selectedEndDate ? selectedEndDate : "",
            adults: adultsCounter,
            children: childrenCounter,
            infants: infantsCounter,
            pets: petCounter,
        })
    }

    useEffect(() => {
        setCity(searchParams.get("city") || "")
        setState(searchParams.get("state") || "")
        setAdults(searchParams.get("adults") || "")
        setChildren(searchParams.get("children") || "")
        setInfants(searchParams.get("infants") || "")
        setPets(searchParams.get("pets") || "")
        setSelectedStartDate(searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null)
        setSelectedEndDate(searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null)
    }, [searchParams])

    const formatDateToISO = (date) => {
        if (!date) return null
        const year = date.getFullYear()
        const month = monthNameToNumber(date.toLocaleString("en-US", { month: "short" })).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    const monthNameToNumber = (monthName) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return monthNames.indexOf(monthName) + 1
    }

    useLayoutEffect(() => {
        if (city && state && inputRef.current) {
            inputRef.current.value = `${city}, ${state}`
        }
    }, [searchHeaderOpen])

    function resetParams() {
        navigate(window.location.pathname, { replace: true })
        setCity("")
        setState("")
        setAdults("")
        setChildren("")
        setInfants("")
        setPets("")
        setSelectedStartDate(null)
        setSelectedEndDate(null)
        inputRef.current.value = ""
    }

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
                        <img src={auth.token ? "https://airebnb.s3.us-east-2.amazonaws.com/" + auth.profilePicture : null} className="homeHeader1UserPicture"></img>
                    </div>
                </div>
                {activeProfileDropdown && <div className='homeHeaderProfileDropdownContainer' ref={profileDropdownRef}>
                    {auth.isLoggedIn ?
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
                        </React.Fragment> :
                        <React.Fragment>
                            <div className='homeHeaderProfileDropdownOption' onClick={showLoginHandler}>
                                <p className='homeHeaderProfileDropdownOptionText'>Log in</p>
                            </div>
                            <div className='homeHeaderProfileDropdownOption' onClick={showSignupHandler}>
                                <p className='homeHeaderProfileDropdownOptionText'>Sign up</p>
                            </div>
                        </React.Fragment>
                    }
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
                    {/* <div className="homeHeader2CategoryContainer2">
                        <i className="fa-solid fa-fire homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Trending</p>
                    </div> */}
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
                        <p className={!selectedStartDate ? "homeHeader2SearchDropdownSubText": "homeHeader2SearchDropdownSubText2"}>{selectedStartDate ? formatDate(selectedStartDate) : "Add dates"}</p>
                    </div>
                    <div className="homeHeader2SearchDropdownCheckOut" onClick={handleCheckOutClick}>
                        <p className="homeHeader2SearchDropdownSubHeader">Check out</p>
                        <p className={!selectedEndDate ? "homeHeader2SearchDropdownSubText": "homeHeader2SearchDropdownSubText2"}>{selectedEndDate ? formatDate(selectedEndDate) : "Add dates"}</p>
                    </div>
                    <div className="homeHeader2SearchDropdownWho" onClick={handleWhoClick}>
                        <p className="homeHeader2SearchDropdownSubHeader">Who</p>
                        <p className={(adultsCounter > 0 || childrenCounter > 0 || infantsCounter > 0 || petCounter > 0) ? "homeHeader2SearchDropdownSubText2" : "homeHeader2SearchDropdownSubText"}>{(adultsCounter > 0 || childrenCounter > 0 || infantsCounter > 0 || petCounter > 0) ? (+adultsCounter + +childrenCounter) + " guests, " + (infantsCounter) + " infants, " + (petCounter) + " pets": "Add guests"}</p>
                    </div>
                    <div className="homeHeader2SearchDropdownSearchContainer" onClick={searchHandler}>
                        <i className="fa-solid fa-magnifying-glass homeHeader2SearchDropdownSearchIcon"></i>
                    </div>
                </div>
                <button className='homeSearch2ResetButton' onClick={resetParams}>Reset Filters</button>
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
                        <Calendar onDateChange={handleDateChange} ref={calendarRef}/>
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
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("adults", "-")}>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>{adultsCounter}</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("adults", "+")}>
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
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("children", "-")}>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>{childrenCounter}</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("children", "+")}>
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
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("infants", "-")}>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>{infantsCounter}</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("infants", "+")}>
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
                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("pets", "-")}>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>-</p>
                            </div>

                                <p className='homeHeader2SearchDropdownGuestContainerRightNumber'>{petCounter}</p>

                            <div className='homeHeader2SearchDropdownGuestContainerRightIconContainer' onClick={() => increment("pets", "+")}>
                                <p className='homeHeader2SearchDropdownGuestContainerRightIcon'>+</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>}
            {showSignup && <Signup closeSignup={closeSignup} showErrorModal={showError}/>}
            {showLogin && <Login closeLogin={closeLogin} showErrorModal={showError}/>}
            {showErrorModal && (
                <ErrorModal errors={errorMessages} closeModal={closeModal} />
            )}
        </div>
    )
}

export default HomeHeader
