import React, { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../../Context/Auth-Context"
import ErrorModal from "./ErrorModal"
import Login from "../Pages/Login"

import './Footer2.css'
import Signup from "../Pages/Signup"

function Footer2() {
    const [error, setError] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    function showSignupHandler() {
        if (showLogin) setShowLogin(false)
        setShowSignup(true)
    }

    function showLoginHandler() {
        if (showSignup) setShowSignup(false)
        setShowLogin(true)
    }

    const showError = (errors) => {
        setError(errors)
    }

    return (
        <div className="footer2Container">
            <div className="footer2OptionContainer" onClick={() => navigate("/")}>
                <i className="fa-solid fa-house footer2OptionIcon"></i>
                <p className="footer2OptionText">Home</p>
            </div>
            <div className="footer2OptionContainer" onClick={() => auth.token ? navigate("/hostingDashboard") : setError("You must be logged in to access the dashboard.")}>
                <i className="fa-solid fa-sliders footer2OptionIcon"></i>
                <p className="footer2OptionText">Dashboard</p>
            </div>
            <div className="footer2OptionContainer" onClick={() => auth.token ? navigate("/saved") : setError("You must be logged in to start saving listings.")}>
                <i className="fa-regular fa-heart footer2OptionIcon"></i>
                <p className="footer2OptionText">Saved</p>
            </div>
            <div className="footer2OptionContainer" onClick={() => auth.token ? navigate("/profile/" + auth.userId) : setError("You must be logged in to access your profile.")}>
                <i className="fa-solid fa-user footer2OptionIcon"></i>
                <p className="footer2OptionText">Profile</p>
            </div>
            <div className="footer2OptionContainer" onClick={() => auth.token ? auth.logout() : setShowLogin(true)}>
                <i className="fa-solid fa-arrow-up-from-bracket footer2OptionIcon"></i>
                <p className="footer2OptionText">{auth.token ? "Log out" : "Log in"}</p>
            </div>
            {showLogin && <Login already={showSignupHandler} closeLogin={() => setShowLogin(false)} showErrorModal={showError} />}
            {showSignup && <Signup already={showLoginHandler} closeSignup={() => setShowSignup(false)} showErrorModal={showError}/>}
            {error && <ErrorModal errors={[error]} closeModal={() => setError(null)} />}
        </div>
    )
}

export default Footer2
