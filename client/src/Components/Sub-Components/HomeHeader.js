import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router"

import './HomeHeader.css'

import airbnbLogo from '../../Images/airbnbLogo.png'
import personalPic from '../../Images/personalPic.jpg'

function HomeHeader(props) {
    const homePage = props.homePage
    const profilePage = props.profilePage ? props.profilePage : null

    const [searchHeaderOpen, setSearchHeaderOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [autocompleteService, setAutocompleteService] = useState(null)

    const navigate = useNavigate()
    const inputRef = useRef()

    const handleScriptLoad = () => {
      if (window.google) {
        setAutocompleteService(new window.google.maps.places.AutocompleteService())
      }
    };

    const searchPlaces = (input) => {
        if (autocompleteService && input) {
          autocompleteService.getPlacePredictions({ input }, setSearchResults)
        } else {
          setSearchResults([])
        }
    };

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
                    <div className="homeHeader1UserContainer">
                        <i className="fa-solid fa-bars homeHeader1UserMenuBars"></i>
                        <img src={personalPic} className="homeHeader1UserPicture"></img>
                    </div>
                </div>
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
            {homePage && searchHeaderOpen &&
            <div className="homeHeader2SearchDropdownContainer">
                <div className="homeHeader2SearchDropdown">
                    <div className="homeHeader2SearchDropdownWhere">
                        <p className="homeHeader2SearchDropdownSubHeader">Where</p>
                        <input ref={inputRef}
                            className="homeHeader2SearchDropdownSubInput"
                            placeholder="Search destinations"
                            onChange={(e) => searchPlaces(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className="homeHeader2SearchDropdownCheckIn">
                        <p className="homeHeader2SearchDropdownSubHeader">Check in</p>
                        <p className="homeHeader2SearchDropdownSubText">Add dates</p>
                    </div>
                    <div className="homeHeader2SearchDropdownCheckOut">
                        <p className="homeHeader2SearchDropdownSubHeader">Check out</p>
                        <p className="homeHeader2SearchDropdownSubText">Add dates</p>
                    </div>
                    <div className="homeHeader2SearchDropdownWho">
                        <p className="homeHeader2SearchDropdownSubHeader">Who</p>
                        <p className="homeHeader2SearchDropdownSubText">Add guests</p>
                    </div>
                    <div className="homeHeader2SearchDropdownSearchContainer">
                        <i className="fa-solid fa-magnifying-glass homeHeader2SearchDropdownSearchIcon"></i>
                    </div>
                </div>
                <div className="homeHeader2SearchDropdownBackdrop" onClick={() => setSearchHeaderOpen(false)}></div>
                <div className="homeHeader2SearchDropdownPlacesContainer">
                    {searchResults.map((result, index) => (
                        <div key={index} className="homeHeader2SearchDropdownPlaceContainer">
                        {result.description}
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default HomeHeader
