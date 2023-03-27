import React, { useState, useEffect, useContext, useRef } from "react"

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete'

import './CreateListing.css'

import airbnbMiniLogo from '../../Images/airbnb-512.png'
import airbnbMiniPic1 from '../../Images/airbnbListingPic1.png'
import airbnbMiniPic2 from '../../Images/airbnbListingPic2.png'
import airbnbMiniPic3 from '../../Images/airbnbListingPic3.png'
import airbnbListing2Pic from '../../Images/airbnbListing2.png'
import airbnbStep2 from '../../Images/airbnbStep2.png'
import airbnbStep3 from '../../Images/abnbpic3.png'
import staticMap from '../../Images/staticmap.png'
import airbnbMapMarker from '../../Images/airbnbMapMarker.png'
import airbnbMapMarker2 from '../../Images/airbnbMapMarker2.png'
import airbnbMapMarker3 from '../../Images/airbnbMapMarker3.png'
import spill1 from '../../Images/spill1.png'
import spill2 from '../../Images/spill2.png'
import spill3 from '../../Images/spill3.png'
import spill4 from '../../Images/spill4.png'
import spill5 from '../../Images/spill5.png'
import homePic from '../../Images/home1.jpg'
import { useNavigate } from "react-router"
import { AuthContext } from "../../Context/Auth-Context"
import ImageUpload2 from "../Sub-Components/ImageUpload2"

function CreateListing() {
    const [listingBodyId, setListingBodyId] = useState(+window.location.pathname.slice(15))

    const auth = useContext(AuthContext)

    const navigate = useNavigate()

    const [barProgress1, setBarProgress1] = useState(0)

    const [placeType, setPlaceType] = useState(null) // listingBodyId 3
    const [placeSize, setPlaceSize] = useState(null) // listingBodyId 4
    const [placeCategory, setPlaceCateogry] = useState(null)
    const [placeAddress, setPlaceAddress] = useState(null) // 5
    const [placeCity, setPlaceCity] = useState(null) // 5
    const [placeState, setPlaceState] = useState(null)
    const [placeZipCode, setPlaceZipCode] = useState(null)
    const [placeAptNum, setPlaceAptNum] = useState(null)
    const [coordinates, setCoordinates] = useState(null)
    const [placeMaxGuests, setPlaceMaxGuests] = useState(0) // 8
    const [placeBedrooms, setPlaceBedrooms] = useState(0) //8
    const [placeBeds, setPlaceBeds] = useState(0) // 8
    const [placeBathrooms, setPlaceBathrooms] = useState(0) // 8
    const [placePets, setPlacePets] = useState(true)
    const [wifi, setWifi] = useState(false) // 10
    const [selfCheckIn, setSelfCheckIn] = useState(false) // 10
    const [tv, setTv] = useState(false) // 10
    const [ac, setAc] = useState(false) // 10
    const [heating, setHeating] = useState(false) // 10
    const [smokeAlarm, setSmokeAlarm] = useState(false) // 10
    const [washerDryer, setWasherDryer] = useState(false) // 10
    const [essentials, setEssentials] = useState(false) // 10
    const [images, setImages] = useState({}) // 11
    const [placeTitle, setPlaceTitle] = useState(null) // 12
    const [placeDesc, setPlaceDesc] = useState(null) // 13
    const [anyGuest, setAnyGuest] = useState(true) // 15
    const [visitedSteps, setVisitedSteps] = useState([0])
    const [showDropdown, setShowDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleImageSelected = (key, file) => {
        const fileReader = new FileReader()

        fileReader.onload = () => {
            const imageUrl = fileReader.result

            setImages((prevImages) => ({
                ...prevImages,
                [key]: {
                    url: imageUrl,
                    file: file
                }
            }))
        }

        fileReader.readAsDataURL(file)
    }

    const isValidZipCode = (zipCode) => {
        const zipCodePattern = /^\d{5}$/
        return zipCodePattern.test(zipCode)
    }

    const getNextIncompleteListingBodyId = () => {
        if (
          !placeType &&
          !placeSize &&
          !placeAddress &&
          !placeZipCode &&
          (!placeMaxGuests ||
          !placeBedrooms ||
          !placeBeds ||
          !placeBathrooms) &&
          !wifi &&
          !selfCheckIn &&
          !tv &&
          !ac &&
          !heating &&
          !smokeAlarm &&
          !washerDryer &&
          !essentials &&
          !placeTitle &&
          !placeDesc &&
          visitedSteps.includes(0)
        ) {
          return 0
        }
        if (!placeType && visitedSteps.includes(3)) return 3
        if (!placeSize && visitedSteps.includes(4)) return 4
        if (!placeAddress && visitedSteps.includes(5)) return 5
        if (!isValidZipCode(placeZipCode) && visitedSteps.includes(6)) return 6
        if (
          (!placeMaxGuests || !placeBedrooms || !placeBeds || !placeBathrooms) &&
          visitedSteps.includes(8)
        ) {
            return 8
        }
        if (
          !wifi &&
          !selfCheckIn &&
          !tv &&
          !ac &&
          !heating &&
          !smokeAlarm &&
          !washerDryer &&
          !essentials &&
          visitedSteps.includes(10)
        ) {
            return 10
        }
        if (Object.keys(images).length < 5 && visitedSteps.includes(11)) return 11
        if (!placeTitle && visitedSteps.includes(12)) return 12
        if (!placeDesc && visitedSteps.includes(13)) return 13
        return -1
    }

    useEffect(() => {
        // If the user tries to access an invalid step, redirect to the hosting dashboard
        if (listingBodyId < 0) {
            navigate("/hostingDashboard")
        }
        else if (!visitedSteps.includes(listingBodyId)) {
            // If the user tries to access a step they haven't visited, redirect to the earliest incomplete step
            const nextIncompleteListingBodyId = getNextIncompleteListingBodyId()
            if (nextIncompleteListingBodyId !== -1) {
                setListingBodyId(nextIncompleteListingBodyId);
                navigate(`/createlisting/${nextIncompleteListingBodyId}`)
            }
        }
        else {
            // Update the progress bar as before
            if (listingBodyId < 3) {
                setBarProgress1(0)
            }

            if (listingBodyId >= 3 && listingBodyId <= 17) {
                setBarProgress1((100 / 15) * (listingBodyId - 2))
            }
        }
    }, [
        listingBodyId,
        navigate,
        placeType,
        placeSize,
        placeAddress,
        placeMaxGuests,
        placeBedrooms,
        placeBeds,
        placeBathrooms,
        placeTitle,
        placeDesc
    ])

    useEffect(() => {
        if (listingBodyId < 3) {
            setBarProgress1(0)
        }

        if (listingBodyId >= 3 && listingBodyId <= 17) {
            setBarProgress1((100 / 15) * (listingBodyId - 2))
        }
    }, [listingBodyId])

    useEffect(() => {
        const handlePopState = () => {
          setListingBodyId(+window.location.pathname.slice(15))
        }

        window.addEventListener("popstate", handlePopState)

        return () => {
          window.removeEventListener("popstate", handlePopState)
        }
    }, [])

    const [image, setImage] = useState(null)

    function onImageUpload(isValid, uploadedImage) {
        if (isValid) {
            setImage(uploadedImage)
        }
    }

    let [searchTerm, setSearchTerm] = useState("")
    let [priceCounter, setPriceCounter] = useState(150)

    function incrementPrice(sign) {
        if (sign == "-" && priceCounter > 5) setPriceCounter(prev => prev - 5)
        else if (sign == "+" && priceCounter < 995) setPriceCounter(prev => prev + 5)
    }

    async function fetchCoordinates(address) {
        const google = window.google
        const geocoder = new google.maps.Geocoder()

        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            const lat = results[0].geometry.location.lat()
            const lng = results[0].geometry.location.lng()
            setCoordinates({ lat, lng })
          } else {
            console.error("Geocode was not successful for the following reason: " + status)
          }
        })
    }

    let fullAddress = `${placeAddress}, ${placeCity}, ${placeState}`

    useEffect(() => {
        if (listingBodyId === 6 && window.google) {
            fetchCoordinates(fullAddress)
        }
    }, [listingBodyId, window.google])

    useEffect(() => {
        if ((listingBodyId == 6 || listingBodyId == 7) && window.google && coordinates) {
            const google = window.google

            let map = new google.maps.Map(document.getElementById("listingBodyMainMapContainer"), {
                center: { lat: coordinates.lat, lng: coordinates.lng },
                zoom: 15,
                zoomControl: listingBodyId === 6 ? false : true,
                scrollwheel: listingBodyId === 6 ? false : true,
                rotateControl: false,
                scaleControl: false,
                gestureHandling: listingBodyId === 6 ? 'none' : true,
                clickableIcons: false,
                fullscreenControl: false,
            })

            let icon = {
                url: airbnbMapMarker3,
                scaledSize: new google.maps.Size(80, 80)
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
                position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
                map: map
            })

            marker.setIcon(icon)
            map.set("styles", mapStyling)
        }
    }, [listingBodyId, window.google, coordinates])

    function toBack() {
        const previousStep = listingBodyId - 1
        if (previousStep > 0 && visitedSteps.includes(previousStep)) {
          navigate("/createListing/" + previousStep)
          setListingBodyId((prev) => prev - 1)
        }
      }

      function toFront() {
        const nextStep = listingBodyId + 1
        const nextIncompleteListingBodyId = getNextIncompleteListingBodyId()

        // Steps without state
        const stepsWithoutState = [0, 1, 2, 7, 9, 14, 15, 16, 17]

        // Allow moving forward from steps without state
        if (
            stepsWithoutState.includes(listingBodyId) ||
            visitedSteps.includes(nextStep) ||
            nextIncompleteListingBodyId === -1 ||
            nextIncompleteListingBodyId > listingBodyId + 1
        ) {
            if (listingBodyId !== 17) { // Add this condition
                navigate("/createListing/" + nextStep)
                setListingBodyId(nextStep)
                if (!visitedSteps.includes(nextStep)) {
                    setVisitedSteps((prev) => [...prev, nextStep])
                }
            }
        }
    }

    function setPlaceAddressHandler(address, cityState) {
        const cityStateArr = cityState.split(",")
        setPlaceAddress(address)
        setPlaceCity(cityStateArr[0])
        setPlaceState(cityStateArr[1].trim())
        setSearchTerm(address + " " + cityState)
    }

    let aptNumRef = useRef()
    let zipCodeRef = useRef()

    function increment(counter, operator) {
        if (counter === 'guests') {
            if (operator === "-" && placeMaxGuests > 0) setPlaceMaxGuests((prev) => prev - 1)
            if (operator === "+" && placeMaxGuests < 10) setPlaceMaxGuests((prev) => prev + 1)
        }
        if (counter === 'bedrooms') {
            if (operator === "-" && placeBedrooms > 0) setPlaceBedrooms((prev) => prev - 1)
            if (operator === "+" && placeBedrooms < 10) setPlaceBedrooms((prev) => prev + 1)
        }
        if (counter === 'beds') {
            if (operator === "-" && placeBeds > 0) setPlaceBeds((prev) => prev - 1)
            if (operator === "+" && placeBeds < 10) setPlaceBeds((prev) => prev + 1)
        }
        if (counter === 'bathrooms') {
            if (operator === "-" && placeBathrooms > 0) setPlaceBathrooms((prev) => prev - 1)
            if (operator === "+" && placeBathrooms < 10) setPlaceBathrooms((prev) => prev + 1)
        }
    }

    function setAmenityHandler(amenity) {
        if (amenity === "wifi") setWifi(!wifi)
        else if (amenity === "selfCheckIn") setSelfCheckIn(!selfCheckIn)
        else if (amenity === "tv") setTv(!tv)
        else if (amenity === "ac") setAc(!ac)
        else if (amenity === "heating") setHeating(!heating)
        else if (amenity === "smokeAlarm") setSmokeAlarm(!smokeAlarm)
        else if (amenity === "washerDryer") setWasherDryer(!washerDryer)
        else if (amenity === "essentials") setEssentials(!essentials)
    }

    async function createListing() {
        setIsLoading(true)

        const date = Date.now().toString()

        const formData = new FormData()

        formData.append(
            "placeGeneralData",
            JSON.stringify({
                placeTitle,
                placeDesc,
                placeType,
                placeSize,
                placeCategory,
                datePosted: date,
                host: auth.userId,
            })
        )

        formData.append(
            "placePriceData",
            JSON.stringify({
                priceCounter,
                cleaningFee: Math.floor(priceCounter * (Math.ceil(Math.random() * 30) / 100)),
                airbnbFee: Math.floor(priceCounter * 0.15),
            })
        )

        formData.append(
            "placeMaxData",
            JSON.stringify({
                placeMaxGuests,
                placeBedrooms,
                placeBeds,
                placeBathrooms,
                placePets,
                anyGuest,
            })
        )

        formData.append(
            "placeLocationData",
            JSON.stringify({
                placeAddress,
                placeCity,
                placeState,
                placeZipCode,
                placeAptNum,
                coordinates: {
                lat: coordinates.lat,
                lng: coordinates.lng,
                },
            })
        )

        formData.append(
            "placeAmenitiesData",
            JSON.stringify({
                wifi,
                selfCheckIn,
                tv,
                ac,
                heating,
                smokeAlarm,
                washerDryer,
                essentials,
            })
        )

        formData.append(
            "reviewsData",
            JSON.stringify({
                reviews: [],
                reviewsCount: 0,
            })
        )

        Object.entries(images).forEach(([key, imageObj], index) => {
            let imagePrefix = ''

            if (key === 'cover') {
                imagePrefix = 'cover_'
            }
            else if (key === 'sub1') {
                imagePrefix = 'sub1_'
            }
            else if (key === 'sub2') {
                imagePrefix = 'sub2_'
            }
            else if (key === 'sub3') {
                imagePrefix = 'sub3_'
            }
            else if (key === 'sub4') {
                imagePrefix = 'sub4_'
            }

            const id = imagePrefix + date

            formData.append(`imageId${index}`, id)
            formData.append(`image${index}`, imageObj.file, id)
        })


        const response = await fetch("http://localhost:5000/" + "listing/create", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": "Bearer " + auth.token,
            },
        })

        const data = await response.json()
        setIsLoading(false)

        if (data) {
            navigate("/hostingDashboard")
            window.location.reload()
        }

        return data
    }

    return (
        <div className="createListingContainer">
            <div className="createListingHeader">
                <div className="createListingHeaderLeft">
                    <img src={airbnbMiniLogo} className="createListingHeaderLogo"/>
                </div>
                <div className="createListingHeaderRight">
                    <button className="createListingHeaderRightButton" onClick={() => navigate("/hostingDashboard")}>Exit</button>
                </div>
            </div>

            {listingBodyId == 0 && <div className="createListingBody0">
                <div className="createListingSubBody0">
                    <div className="createListingBodyWelcomeContainer">
                        <p className="createListingBodyWelcomeText">{"Welcome back, " + auth.firstName}</p>
                    </div>
                    <div className="createListingBodyStartNewContainer">
                        <p className="createListingBodyStartNewTitle">Start a new listing</p>
                        <div className="createListingBodyStartNewOptionContainer" onClick={toFront}>
                            <div className="createListingBodyStartNewOptionLeft">
                                <i className="fa-solid fa-house createListingBodyStartNewOptionLeftIcon"></i>
                                <p className="createListingBodyStartNewOptionMiddleText">Create a new listing</p>
                            </div>
                            <i className="fa-solid fa-chevron-right createListingBodyStartNewOptionRight"></i>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 1 && <div className="createListingBody1">
                <div className="createListingSubBody1">
                    <div className="createListingSubBody1Left">
                        <p className="createListingSubBody1LeftText">It's easy to get started on Airebnb</p>
                    </div>
                    <div className="createListingSubBody1Right">
                        <div className="createListingSubBody1RightListContainer">
                            <div className="createListingSubBody1RightListLeft">
                                <p className="createListingSubBody1RightListLeftNum">1</p>
                            </div>
                            <div className="createListingSubBody1RightListMiddle">
                                <p className="createListingSubBody1RightListMiddleUpperHeader">Tell us about your place</p>
                                <p className="createListingSubBody1RightListMiddleLowerText">Share some basic info, like where it is and how many guests can stay.</p>
                            </div>
                            <div className="createListingSubBody1RightListRight">
                                <img src={airbnbMiniPic1} className="createListingSubBody1RightPicture"/>
                            </div>
                        </div>

                        <div className="createListingSubBody1RightListContainer">
                            <div className="createListingSubBody1RightListLeft">
                                <p className="createListingSubBody1RightListLeftNum">2</p>
                            </div>
                            <div className="createListingSubBody1RightListMiddle">
                                <p className="createListingSubBody1RightListMiddleUpperHeader">Make it stand out</p>
                                <p className="createListingSubBody1RightListMiddleLowerText">Add 5 or more photos plus a title and description—we’ll help you out.</p>
                            </div>
                            <div className="createListingSubBody1RightListRight">
                                <img src={airbnbMiniPic2} className="createListingSubBody1RightPicture"/>
                            </div>
                        </div>

                        <div className="createListingSubBody1RightListContainer">
                            <div className="createListingSubBody1RightListLeft">
                                <p className="createListingSubBody1RightListLeftNum">3</p>
                            </div>
                            <div className="createListingSubBody1RightListMiddle">
                                <p className="createListingSubBody1RightListMiddleUpperHeader">Finish up and publish</p>
                                <p className="createListingSubBody1RightListMiddleLowerText">Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.</p>
                            </div>
                            <div className="createListingSubBody1RightListRight">
                                <img src={airbnbMiniPic3} className="createListingSubBody1RightPicture"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="createListingBody1Footer">
                    <button className="createListingBody1FooterButton" onClick={toFront}>Get started</button>
                </div>
            </div>}
            {listingBodyId == 2 && <div className="createListingBody2">
                <div className="createListingSubBody2">
                    <div className="createListingSubBody2Left">
                        <p className="createListingSubBody2LeftStepText">Step 1</p>
                        <p className="createListingSubBody2LeftTellUsText">Tell us about your place</p>
                        <p className="createListingSubBody2LeftDescText">In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
                    </div>
                    <div className="createListingSubBody2Right">
                        <img src={airbnbListing2Pic} className="createListingSubBody2RightImg"/>
                    </div>
                </div>
            </div>}
            {listingBodyId == 3 && <div className="createListingBody3">
                <div className="createListingSubBody3">
                    <p className="createListingSubBody3Title">Which of these best describes your place?</p>
                    <div className="createListingSubBody3List">
                        <div className={placeType === "house" ? "createListingSubBody3ListOption2" : "createListingSubBody3ListOption"} onClick={() => setPlaceType("house")}>
                            <i className="fa-solid fa-house createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">House</p>
                        </div>
                        <div className={placeType === "apartment" ? "createListingSubBody3ListOption2" : "createListingSubBody3ListOption"} onClick={() => setPlaceType("apartment")}>
                            <i className="fa-solid fa-building createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">Apartment</p>
                        </div>
                        <div className={placeType === "hotel" ? "createListingSubBody3ListOption2" : "createListingSubBody3ListOption"} onClick={() => setPlaceType("hotel")}>
                            <i className="fa-solid fa-hotel createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">Hotel</p>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 4 && <div className="createListingBody4">
                <div className="createListingSubBody4">
                    <p className="createListingSubBody4Title">What type of place will guests have?</p>
                    <div className="createListingSubBody4List">
                        <div className={placeSize === "entirePlace" ? "createListingSubBody4ListOption2" : "createListingSubBody4ListOption"} onClick={() => setPlaceSize("entirePlace")}>
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">An entire place</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests have the whole place to themselves.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-house createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                        <div className={placeSize === "privateRoom" ? "createListingSubBody4ListOption2" : "createListingSubBody4ListOption"} onClick={() => setPlaceSize("privateRoom")}>
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">A private room</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests sleep in a private room but some areas may be shared with you or others.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-door-closed createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                        <div className={placeSize === "sharedRoom" ? "createListingSubBody4ListOption2" : "createListingSubBody4ListOption"} onClick={() => setPlaceSize("sharedRoom")}>
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">A shared room</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests sleep in a room or common area that may be shared with you or others.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-people-arrows createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 5 && <div className="createListingBody5">
                <div className="createListingSubBody5">
                    <div className="createListingSubBody5Header">
                        <p className="createListingSubBody5HeaderTitle">Where's your place located?</p>
                        <p className="createListingSubBody5HeaderDesc">Your address is only shared with guests after they’ve made a reservation.</p>
                    </div>
                    <div className="createListingSubBody5Body">
                        <PlacesAutocomplete
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e);
                                setShowDropdown(true);
                            }}
                            searchOptions={{
                                componentRestrictions: {
                                    country: "US"
                                },
                                types: ['address']
                            }}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="createListingSubBody5BodyInputContainer">
                                <i className="fa-solid fa-location-dot fld"></i>
                                <div className="createListingSubBody5BodyInputContainerLower">
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Enter your address',
                                            className: 'location-search-input',
                                        })}
                                    />
                                    <div className="autocomplete-dropdown-container" id="autocompleteDropdown" style={{ display: showDropdown ? "flex" : "none" }}>
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active ? 'suggestion-item--active'
                                            : 'suggestion-item';

                                            return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                className
                                                })}
                                                key={suggestion.index}
                                                onClick={() => {
                                                    setPlaceAddressHandler(suggestion.formattedSuggestion.mainText, suggestion.formattedSuggestion.secondaryText);
                                                    setShowDropdown(false);
                                                }}
                                            >
                                                <div className="suggestionItemLeft">
                                                    <div className="buildingIconContainer">
                                                        <i className="fa-solid fa-building building1"></i>
                                                    </div>
                                                </div>
                                                <div className="suggestionItemRight">
                                                    <p className="suggestionAddress">{suggestion.formattedSuggestion.mainText}</p>
                                                    <p className="suggestionCityState">{suggestion.formattedSuggestion.secondaryText}</p>
                                                </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                    </div>
                </div>
            </div>}
            {listingBodyId == 6 && <div className="createListingBody6">
                <div className="createListingSubBody6">
                    <div className="createListingSubBody6Header">
                        <p className="createListingSubBody6Header1">Confirm your address</p>
                        <p className="createListingSubBody6Header2">Your address is only shared with guests after they've made a reservation.</p>
                    </div>
                    <div className="createListingSubBody6Form">
                        <div className="createListingSubBody6Input">{placeAddress}</div>
                        <input className="createListingSubBody6Input" placeholder="Apt, suite, etc. (Optional)" ref={aptNumRef} onChange={(e) => setPlaceAptNum(e.target.value)}/>
                        <div className="createListingSubBody6Input">{placeCity}</div>
                        <div className="createListingSubBody6FormHorizontalContainer">
                            <div className="createListingSubBody6Input5">{placeState}</div>
                            <input className="createListingSubBody6Input3" placeholder="Zip code" ref={zipCodeRef} onChange={(e) => setPlaceZipCode(e.target.value)} value={placeZipCode || ''} minLength={5} maxLength={5} type={"text"} pattern="\d{5}" required={true}/>
                        </div>
                        <div className="createListingSubBody6Input4">
                            <p className="createListingSubBody6InputText">United States - US</p>
                        </div>
                    </div>
                    <div className="createListingSubBody6MapContainer">
                        <div className="createListingSubBody6Map" id="listingBodyMainMapContainer"/>
                    </div>
                </div>
            </div>}
            {listingBodyId == 7 && <div className="createListingBody7">
                <div className="createListingSubBody7">
                    <div className="createListingSubBody7Header">
                        <p className="createListingSubBody7Header1">Is the pin in the right spot?</p>
                        <p className="createListingSubBody7Header2">Your address is only shared with guests after they've made a reservation.</p>
                    </div>
                    <div className="createListingSubBody7MapContainer">
                        <div className="createListingSubBody7MapAddress">
                            <i className="fa-solid fa-location-dot createListingSubBody7MapAddressIcon"></i>
                            <p className="createListingSubBody7MapAddressText">{[placeAddress, ", ", placeCity, ", ", placeState, " ", placeZipCode]}</p>
                        </div>
                        <div className="createListingSubBody7Map" id="listingBodyMainMapContainer"/>
                    </div>
                </div>
            </div>}
            {listingBodyId == 8 && <div className="createListingBody8">
                <div className="createListingSubBody8">
                    <div className="createListingSubBody8Header">
                        <p className="createListingSubBody8Header1">Share some basics about your place</p>
                        <p className="createListingSubBody8Header2">You'll add more details later, like bed types.</p>
                    </div>
                    <div className="createListingSubBody8Body">
                        <div className="createListingSubBody8OptionContainer">
                            <p className="createListingSubBody8OptionText">Guests</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("guests", "-")}>
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">{placeMaxGuests}</p>
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("guests", "+")}>
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody8OptionContainer">
                            <p className="createListingSubBody8OptionText">Bedrooms</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("bedrooms", "-")}>
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">{placeBedrooms}</p>
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("bedrooms", "+")}>
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody8OptionContainer">
                            <p className="createListingSubBody8OptionText">Beds</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("beds", "-")}>
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">{placeBeds}</p>
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("beds", "+")}>
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody8OptionContainer">
                            <p className="createListingSubBody8OptionText">Bathrooms</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("bathrooms", "-")}>
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">{placeBathrooms}</p>
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => increment("bathrooms", "+")}>
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody8OptionContainer2">
                            <p className="createListingSubBody8OptionText">Pets</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => setPlacePets(!placePets)}>
                                    <i className="fa-solid fa-chevron-left createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">{placePets ? "Allowed" : "Not Allowed"}</p>
                                <div className="createListingSubBody8OptionRightIconContainer" onClick={() => setPlacePets(!placePets)}>
                                    <i className="fa-solid fa-chevron-right createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 9 && <div className="createListingBody9">
                <div className="createListingSubBody9">
                    <div className="createListingSubBody9Left">
                        <p className="createListingSubBody9LeftUpper">Step 2</p>
                        <p className="createListingSubBody9LeftMiddle">Make your place stand out</p>
                        <p className="createListingSubBody9LeftLower">In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.</p>
                    </div>
                    <div className="createListingSubBody9Right">
                        <img src={airbnbStep2} className="createListingSubBody9RightPic"/>
                    </div>
                </div>
            </div>}
            {listingBodyId == 10 && <div className="createListingBody10">
                <div className="createListingSubBody10">
                    <p className="createListingSubBody10Title">Tell guests what your place has to offer</p>
                    <p className="createListingSubBody10SubTitle">You can add more amenities after you publish your listing.</p>
                    <div className="createListingSubBody10List">
                        <div className="createListingSubBody10ListRow">
                            <div className={!wifi ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("wifi")}>
                                <i className="fa-solid fa-wifi createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Wifi</p>
                            </div>
                            <div className={!selfCheckIn ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("selfCheckIn")}>
                                <i className="fa-solid fa-key createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Self check-in</p>
                            </div>
                            <div className={!tv ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("tv")}>
                                <i className="fa-solid fa-tv createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">TV</p>
                            </div>
                        </div>
                        <div className="createListingSubBody10ListRow">
                            <div className={!ac ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("ac")}>
                                <i className="fa-solid fa-snowflake createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Air conditioning</p>
                            </div>
                            <div className={!heating ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("heating")}>
                                <i className="fa-solid fa-thermometer-three-quarters createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Heating</p>
                            </div>
                            <div className={!smokeAlarm ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("smokeAlarm")}>
                                <i className="fa-solid fa-bell createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Smoke alarm</p>
                            </div>
                        </div>
                        <div className="createListingSubBody10ListRow">
                            <div className={!washerDryer ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("washerDryer")}>
                                <i className="fa-solid fa-shirt createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Washer & Dryer</p>
                            </div>
                            <div className={!essentials ? "createListingSubBody10ListOption" : "createListingSubBody10ListOption3"} onClick={() => setAmenityHandler("essentials")}>
                                <i className="fa-solid fa-bottle-droplet createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Essentials</p>
                            </div>
                            <div className="createListingSubBody10ListOption2"/>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 11 && <div className="createListingBody11">
                <div className="createListingSubBody11">
                    <p className="createListingBody11Title">Choose your place's images</p>
                    <div className="createListingBody11Body">
                        <div className="createListingBody11CoverPicContainer">
                            <div className="createListingBody11CoverPicTextContainer">
                                <p className="createListingBody11CoverPicText">Cover Photo</p>
                            </div>
                            <div className="createListingBody11CoverPicMainContainer">
                                {images.cover ? <img src={images.cover.url} className="loadedImage"/> : <ImageUpload2 onValid={onImageUpload} onImageSelected={file => handleImageSelected("cover", file)}/>}
                            </div>
                        </div>
                        <div className="createListingBody11SubPicContainer">
                            <div className="createListingBody11SubPicMainContainer">
                                {images.sub1 ? <img src={images.sub1.url} className="loadedImage"/> : <ImageUpload2 onValid={onImageUpload} onImageSelected={file => handleImageSelected("sub1", file)}/>}
                            </div>
                            <div className="createListingBody11SubPicMainContainer">
                                {images.sub2 ? <img src={images.sub2.url} className="loadedImage"/> : <ImageUpload2 onValid={onImageUpload} onImageSelected={file => handleImageSelected("sub2", file)}/>}
                            </div>
                        </div>
                        <div className="createListingBody11SubPicContainer">
                            <div className="createListingBody11SubPicMainContainer">
                                {images.sub3 ? <img src={images.sub3.url} className="loadedImage"/> : <ImageUpload2 onValid={onImageUpload} onImageSelected={file => handleImageSelected("sub3", file)}/>}
                            </div>
                            <div className="createListingBody11SubPicMainContainer">
                                {images.sub4 ? <img src={images.sub4.url} className="loadedImage"/> : <ImageUpload2 onValid={onImageUpload} onImageSelected={file => handleImageSelected("sub4", file)}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 12 && <div className="createListingBody12">
                <div className="createListingSubBody12">
                    <p className="createListingSubBody12Title">Now, let's give your house a title</p>
                    <p className="createListingSubBody12SubTitle">Short titles work best. Have fun with it—you can always change it later.</p>
                    <textarea rows="5" maxLength="32" className="createListingSubBody12TextArea" onChange={(e) => setPlaceTitle(e.target.value)} defaultValue={placeTitle || ''} minLength={5}/>
                </div>
            </div>}
            {listingBodyId == 13 && <div className="createListingBody13">
                <div className="createListingSubBody13">
                    <p className="createListingSubBody13Title">Create your description</p>
                    <p className="createListingSubBody13SubTitle">Share what makes your place special.</p>
                    <textarea rows="7" maxLength="500" className="createListingSubBody13TextArea" onChange={(e) => setPlaceDesc(e.target.value)} defaultValue={placeDesc || ''} minLength={10}/>
                </div>
            </div>}
            {listingBodyId == 14 && <div className="createListingBody14">
                <div className="createListingSubBody14">
                    <div className="createListingSubBody14Left">
                        <p className="createListingSubBody14LeftUpper">Step 3</p>
                        <p className="createListingSubBody14LeftMiddle">Finish up and publish</p>
                        <p className="createListingSubBody14LeftLower">Finally, you’ll choose if you'd like to start with an experienced guest, then you'll set your nightly price. Answer a few quick questions and publish when you're ready.</p>
                    </div>
                    <div className="createListingSubBody14Right">
                        <img src={airbnbStep3} className="createListingSubBody14RightPic"/>
                    </div>
                </div>
            </div>}
            {listingBodyId == 15 && <div className="createListingBody15">
                <div className="createListingSubBody15">
                    <p className="createListingSubBody15Title">Choose who to welcome for your first reservation</p>
                    <p className="createListingSubBody15SubTitle">After your first guest, anyone can book your place.</p>
                    <div className="createListingSubBody15OptionContainer">
                        <div className="createListingSubBody15OptionContainerLeft">
                            <div className="createListingSubBody15OptionContainerLeftCircleContainer">
                                <div className="createListingSubBody15OptionContainerLeftCircleMid">
                                    <div className="createListingSubBody15OptionContainerLeftCircleLast"/>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody15OptionContainerRight">
                            <p className="createListingSubBody15OptionContainerRightTitle">Any Airbnb guest</p>
                            <p className="createListingSubBody15OptionContainerRightSubTitle">Get reservations faster when you welcome anyone from the Airbnb community.</p>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 16 && <div className="createListingBody16">
                <div className="createListingSubBody16">
                    <p className="createListingSubBody16Title">Now, set your price</p>
                    <p className="createListingSubBody16SubTitle">You can change it anytime.</p>
                    <div className="createListingSubBody16PriceContainer">
                        <div className="createListingSubBody16PriceContainerMain">
                            <div className="createListingSubBody16PriceSignContainer" onClick={() => incrementPrice("-")}>
                                <p className="createListingSubBody16PriceSign">-</p>
                            </div>
                            <div className="createListingSubBody16PriceCounterContainer">
                                <p className="createListingSubBody16PriceCounter">${priceCounter}</p>
                            </div>
                            <div className="createListingSubBody16PriceSignContainer" onClick={() => incrementPrice("+")}>
                                <p className="createListingSubBody16PriceSign">+</p>
                            </div>
                        </div>
                        <p className="createListingSubBody16PerNightText">per night</p>
                    </div>
                </div>
            </div>}
            {listingBodyId == 17 && <div className="createListingBody17">
                <div className="createListingSubBody17">
                    <p className="createListingSubBody17Title">Review your listing</p>
                    <p className="createListingSubBody17SubTitle">Here's what we'll show to guests. Make sure everything looks good.</p>
                    <div className="createListingSubBody17ReviewContainer">
                        <div className="createListingSubBody17ReviewContainerLeft">
                            <div className="createListingSubBody17ReviewContainerLeftCard">
                                <img src={images.cover ? images.cover.url : null} className="createListingSubBody17ReviewContainerLeftCardPic"/>
                                <div className="createListingSubBody17ReviewContainerLeftCardTextContainer">
                                    <p className="createListingSubBody17ReviewContainerLeftCardText2">{placeTitle}</p>
                                    <div className="createListingSubBody17ReviewContainerLeftCardReviewContainer">
                                        <p className="createListingSubBody17ReviewContainerLeftCardText">New</p>
                                        <i className="fa-solid fa-star createListingSubBody17ReviewContainerLeftCardText"></i>
                                    </div>
                                </div>
                                <div className="createListingSubBody17ReviewContainerLeftCardTextContainer2">
                                    <p className="createListingSubBody17ReviewContainerLeftCardText2">{"$" + priceCounter}</p>
                                    <p className="createListingSubBody17ReviewContainerLeftCardText3">night</p>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody17ReviewContainerRight">
                            <p className="createListingSubBody17ReviewContainerRightTitle">What's next?</p>
                            <div className="createListingSubBody17ReviewContainerRightOption">
                                <div className="createListingSubBody17ReviewContainerRightOptionLeft">
                                    <i className="fa-regular fa-calendar createListingSubBody17ReviewContainerRightOptionLeft"></i>
                                </div>
                                <div className="createListingSubBody17ReviewContainerRightOptionRight">
                                    <p className="createListingSubBody17ReviewContainerRightOptionRightText1">Set up your calendar</p>
                                    <p className="createListingSubBody17ReviewContainerRightOptionRightText2">Choose which dates your listing is available. It will be visible 24 hours after you publish</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId >= 2 && <div className="createListingBody2Footer">
                    <div className="createListingBody2FooterUpper">
                        <div className="createListingBody2FooterUpperLine">
                            <div className="createListingBody2FooterUpperOverlay" style={{transform: "translateX(" + barProgress1 + "%)"}}/>
                        </div>
                    </div>
                    <div className="createListingBody2FooterLower">
                        <p className="createListingBody2FooterBackText" onClick={toBack}>Back</p>
                        <button className={listingBodyId === 17 ? "createListingBody2FooterButton2" : "createListingBody2FooterButton"} onClick={async () => {
                            if (listingBodyId === 17) {
                                await createListing()
                                } else {
                                    toFront()
                                }
                            }}>{isLoading ? "Creating..." : listingBodyId === 17 ? "Create" : "Next"}</button>
                    </div>
            </div>}
        </div>
    )
}

export default CreateListing
