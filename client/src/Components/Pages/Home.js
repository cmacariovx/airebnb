import React, { useState } from "react"

import './Home.css'

import HomeHeader from "../Sub-Components/HomeHeader"
import HomeBody from "../Sub-Components/HomeBody"
import HomeFooter from "../Sub-Components/HomeFooter"

import ListingsContext from "../../Context/ListingsContext"

function Home() {
    const [listings, setListings] = useState([])

    function resetListings() {
        setListings([])
    }

    return (
        <ListingsContext.Provider value={{ listings, setListings, resetListings }}>
            <div className="homeContainer">
                <HomeHeader homePage={true}/>
                <HomeBody/>
                <HomeFooter/>
            </div>
        </ListingsContext.Provider>
    )
}

export default Home
