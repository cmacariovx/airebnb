import React from "react";

import './Home.css'

import HomeHeader from "../Sub-Components/HomeHeader";
import HomeBody from "../Sub-Components/HomeBody";
import HomeFooter from "../Sub-Components/HomeFooter";


function Home() {
    return (
        <div className="homeContainer">
            <HomeHeader/>
            <HomeBody/>
            <HomeFooter/>
        </div>
    )
}

export default Home
