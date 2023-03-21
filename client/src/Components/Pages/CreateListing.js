import React, { useState, useEffect } from "react"

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete'

import { Loader } from "@googlemaps/js-api-loader"

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

function CreateListing() {
    const [listingBodyId, setListingBodyId] = useState(+window.location.pathname.slice(15))

    const navigate = useNavigate()

    // 6 (3 - 8)
    // 4 (10 - 13)
    // 3 (15 - 17)

    const [barProgress1, setBarProgress1] = useState(0)
    const [barProgress2, setBarProgress2] = useState(0)
    const [barProgress3, setBarProgress3] = useState(0)

    useEffect(() => {
        if (listingBodyId >= 3 && listingBodyId <= 8) {
          setBarProgress1(100 / 6);
        }

        if (listingBodyId >= 10 && listingBodyId <= 13) {
          setBarProgress2(100 / 4);
        }

        if (listingBodyId >= 15 && listingBodyId <= 17) {
          setBarProgress3(100 / 3);
        }
      }, [listingBodyId])


    let [searchTerm, setSearchTerm] = useState("")
    let [priceCounter, setPriceCounter] = useState(150)

    function increment(sign) {
        if (sign == "-" && priceCounter > 5) setPriceCounter(prev => prev - 5)
        else if (sign == "+" && priceCounter < 995) setPriceCounter(prev => prev + 5)
    }

    if (listingBodyId == 6 || listingBodyId == 7) {
        const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        version: "weekly",
        })

        loader.load().then((google) => {
            let coords

            let geocoder = new google.maps.Geocoder().geocode({address: "170 merrimon avenue"}).then((data) => {
                coords = [data.results[0].geometry.bounds.Ja.hi, data.results[0].geometry.bounds.Va.hi]
                console.log(coords)
            })
            let map = new google.maps.Map(document.getElementById("listingBodyMainMapContainer"), {
                center: { lat: 35.5951, lng: -82.5515 },
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
                position: new google.maps.LatLng(35.5951, -82.5515),
                map: map
            })

            marker.setIcon(icon)
            map.set("styles", mapStyling)
        })
    }

    function toBack() {
        navigate("/createListing/" + (listingBodyId - 1))
        setListingBodyId(prev => prev - 1)
    }

    function toFront() {
        navigate("/createListing/" + (listingBodyId + 1))
        setListingBodyId(prev => prev + 1)
    }

    return (
        <div className="createListingContainer">
            <div className="createListingHeader">
                <div className="createListingHeaderLeft">
                    <img src={airbnbMiniLogo} className="createListingHeaderLogo"/>
                </div>
                <div className="createListingHeaderRight">
                    <button className="createListingHeaderRightButton">Exit</button>
                </div>
            </div>

            {listingBodyId == 0 && <div className="createListingBody0">
                <div className="createListingSubBody0">
                    <div className="createListingBodyWelcomeContainer">
                        <p className="createListingBodyWelcomeText">Welcome back, Carlos</p>
                    </div>
                    <div className="createListingBodyStartNewContainer">
                        <p className="createListingBodyStartNewTitle">Start a new listing</p>
                        <div className="createListingBodyStartNewOptionContainer">
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
                        <div className="createListingSubBody3ListOption">
                            <i className="fa-solid fa-house createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">House</p>
                        </div>
                        <div className="createListingSubBody3ListOption">
                            <i className="fa-solid fa-building createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">Apartment</p>
                        </div>
                        <div className="createListingSubBody3ListOption">
                            <i class="fa-solid fa-hotel createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">Hotel</p>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 4 && <div className="createListingBody4">
                <div className="createListingSubBody4">
                    <p className="createListingSubBody4Title">What type of place will guests have?</p>
                    <div className="createListingSubBody4List">
                        <div className="createListingSubBody4ListOption">
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">An entire place</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests have the whole place to themselves.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-house createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                        <div className="createListingSubBody4ListOption">
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">A private room</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests sleep in a private room but some areas may be shared with you or others.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-door-closed createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                        <div className="createListingSubBody4ListOption">
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
                            onChange={(e) => setSearchTerm(e)}
                            searchOptions={{
                                bounds: {
                                    east: -66.9513812,
                                    north: 49.3457868,
                                    south: 24.7433195,
                                    west: -124.7844079,
                                }
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
                                    <div className="autocomplete-dropdown-container" id="autocompleteDropdown">
                                        {/* {loading && <p>Loading...</p>} */}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active ? 'suggestion-item--active'
                                            : 'suggestion-item';

                                            return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                className
                                                })}
                                                key={suggestion.index}
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
                        <input className="createListingSubBody6Input" placeholder="Street"/>
                        <input className="createListingSubBody6Input" placeholder="Apt, suite, etc. (Optional)"/>
                        <input className="createListingSubBody6Input" placeholder="City"/>
                        <div className="createListingSubBody6FormHorizontalContainer">
                            <input className="createListingSubBody6Input2" placeholder="State"/>
                            <input className="createListingSubBody6Input3" placeholder="Zip code"/>
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
                            <p className="createListingSubBody7MapAddressText">170 Merrimon Ave, Asheville, NC 28787</p>
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
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">0</p>
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody8OptionContainer">
                            <p className="createListingSubBody8OptionText">Bedrooms</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">0</p>
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody8OptionContainer">
                            <p className="createListingSubBody8OptionText">Beds</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">0</p>
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="createListingSubBody8OptionContainer2">
                            <p className="createListingSubBody8OptionText">Bathrooms</p>
                            <div className="createListingSubBody8OptionRight">
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-minus createListingSubBody8OptionRightIcon"></i>
                                </div>
                                <p className="createListingSubBody8OptionText2">0</p>
                                <div className="createListingSubBody8OptionRightIconContainer">
                                    <i className="fa-solid fa-plus createListingSubBody8OptionRightIcon"></i>
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
                            <div className="createListingSubBody10ListOption">
                                <i className="fa-solid fa-wifi createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Wifi</p>
                            </div>
                            <div className="createListingSubBody10ListOption">
                                <i class="fa-solid fa-key createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Self check-in</p>
                            </div>
                            <div className="createListingSubBody10ListOption">
                                <i class="fa-solid fa-tv createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">TV</p>
                            </div>
                        </div>
                        <div className="createListingSubBody10ListRow">
                            <div className="createListingSubBody10ListOption">
                                <i className="fa-solid fa-snowflake createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Air conditioning</p>
                            </div>
                            <div className="createListingSubBody10ListOption">
                                <i className="fa-solid fa-thermometer-three-quarters createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Heating</p>
                            </div>
                            <div className="createListingSubBody10ListOption">
                                <i className="fa-solid fa-bell createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Smoke alarm</p>
                            </div>
                        </div>
                        <div className="createListingSubBody10ListRow">
                            <div className="createListingSubBody10ListOption">
                                <i className="fa-solid fa-shirt createListingSubBody10ListOptionIcon"></i>
                                <p className="createListingSubBody10ListOptionText">Washer & Dryer</p>
                            </div>
                            <div className="createListingSubBody10ListOption">
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
                    <p className="createListingBody11Title">Ta-da! How does this look?</p>
                    <div className="createListingBody11Body">
                        <div className="createListingBody11CoverPicContainer">
                            <div className="createListingBody11CoverPicTextContainer">
                                <p className="createListingBody11CoverPicText">Cover Photo</p>
                            </div>
                            <div className="createListingBody11CoverPicMainContainer">
                                <img src={spill1} className="createListingBody11CoverPic"/>
                            </div>
                        </div>
                        <div className="createListingBody11SubPicContainer">
                            <div className="createListingBody11SubPicMainContainer">
                                <img src={spill2} className="createListingBody11SubPic"/>
                            </div>
                            <div className="createListingBody11SubPicMainContainer">
                                <img src={spill3} className="createListingBody11SubPic"/>
                            </div>
                        </div>
                        <div className="createListingBody11SubPicContainer">
                            <div className="createListingBody11SubPicMainContainer">
                                <img src={spill4} className="createListingBody11SubPic"/>
                            </div>
                            <div className="createListingBody11SubPicMainContainer">
                                <img src={spill5} className="createListingBody11SubPic"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 12 && <div className="createListingBody12">
                <div className="createListingSubBody12">
                    <p className="createListingSubBody12Title">Now, let's give your house a title</p>
                    <p className="createListingSubBody12SubTitle">Short titles work best. Have fun with it—you can always change it later.</p>
                    <textarea rows="5" maxLength="32" className="createListingSubBody12TextArea"/>
                    <p className="createListingSubBody12CounterText">0/32</p>
                </div>
            </div>}
            {listingBodyId == 13 && <div className="createListingBody13">
                <div className="createListingSubBody13">
                    <p className="createListingSubBody13Title">Create your description</p>
                    <p className="createListingSubBody13SubTitle">Share what makes your place special.</p>
                    <textarea rows="7" maxLength="500" className="createListingSubBody13TextArea"/>
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
                            <div className="createListingSubBody16PriceSignContainer" onClick={() => increment("-")}>
                                <p className="createListingSubBody16PriceSign">-</p>
                            </div>
                            <div className="createListingSubBody16PriceCounterContainer">
                                <p className="createListingSubBody16PriceCounter">${priceCounter}</p>
                            </div>
                            <div className="createListingSubBody16PriceSignContainer" onClick={() => increment("+")}>
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
                                <img src={homePic} className="createListingSubBody17ReviewContainerLeftCardPic"/>
                                <div className="createListingSubBody17ReviewContainerLeftCardTextContainer">
                                    <p className="createListingSubBody17ReviewContainerLeftCardText2">hi</p>
                                    <div className="createListingSubBody17ReviewContainerLeftCardReviewContainer">
                                        <p className="createListingSubBody17ReviewContainerLeftCardText">New</p>
                                        <i className="fa-solid fa-star createListingSubBody17ReviewContainerLeftCardText"></i>
                                    </div>
                                </div>
                                <div className="createListingSubBody17ReviewContainerLeftCardTextContainer2">
                                    <p className="createListingSubBody17ReviewContainerLeftCardText2">$120</p>
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
                            <div className="createListingBody2FooterUpperOverlay1" style={{transform: "translateX(" + barProgress1 + "%)"}}/>
                        </div>
                        <div className="createListingBody2FooterUpperLine">
                            <div className="createListingBody2FooterUpperOverlay2"/>
                        </div>
                        <div className="createListingBody2FooterUpperLine">
                            <div className="createListingBody2FooterUpperOverlay3"/>
                        </div>
                    </div>
                    <div className="createListingBody2FooterLower">
                        <p className="createListingBody2FooterBackText" onClick={toBack}>Back</p>
                        <button className="createListingBody2FooterButton" onClick={toFront}>Next</button>
                    </div>
            </div>}
        </div>
    )
}

export default CreateListing
