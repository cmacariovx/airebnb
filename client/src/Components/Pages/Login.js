import React, { useState, useRef, useContext } from "react";

import { AuthContext } from "../../Context/Auth-Context";

import './Login.css'

function Login({ closeLogin, showErrorModal, already }) {
    const auth = useContext(AuthContext)

    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const [isLoggingIn, setIsLoggingIn] = useState(false)

    async function loginUserHandler(event) {
        event.preventDefault()
        setIsLoggingIn(true)

        const response = await fetch("http://localhost:5000/" + 'auth/login', {
            method: 'POST',
            body: JSON.stringify({
                'email': emailInputRef.current.value,
                'password': passwordInputRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        if (data.error) {
            showErrorModal([data.error])
        }
        else {
            auth.login(data.userId, data.token, data.firstName, data.lastName, data.profilePicture, data.email, data.joinedDate)
        }

        setIsLoggingIn(false)
    }

    async function loginUserHandlerDemo(event) {
        event.preventDefault()
        setIsLoggingIn(true)

        const response = await fetch("http://localhost:5000/" + 'auth/login', {
            method: 'POST',
            body: JSON.stringify({
                'email': "demo@demo.com",
                'password': "Demo123!"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        if (data.error) {
            showErrorModal([data.error])
        }
        else {
            auth.login(data.userId, data.token, data.firstName, data.lastName, data.profilePicture, data.email, data.joinedDate)
        }

        setIsLoggingIn(false)
    }

    return (
        <div className="loginBackdrop" onClick={closeLogin}>
            <div className="loginPageContainer">
                <form onSubmit={loginUserHandler} className="loginContainer" onClick={(e) => e.stopPropagation()}>
                    <p className="loginPageTitle">Log in</p>
                    <label className="loginLabelContainer">
                        <input className="loginInputContainer" ref={emailInputRef} type="email" maxLength="254" placeholder="Email" required />
                    </label>
                    <label className="loginLabelContainer">
                        <input className="loginInputContainer" ref={passwordInputRef} type="password" placeholder="Password" required />
                    </label>
                    <div className="loginButtonsContainer">
                        <button className="loginSubmitButton" type="submit">Log in</button>
                        <button className="demoSubmitButton" onClick={loginUserHandlerDemo}>Demo Login</button>
                    </div>
                    <p className="signupFormLogText" onClick={already}>Don't have an account?</p>
                </form>
            </div>
        </div>
    )
}

export default Login
