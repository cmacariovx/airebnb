import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/Auth-Context";

import ImageUpload from "../Sub-Components/ImageUpload";

import './Signup.css'

function Signup() {
    const firstNameInputRef = useRef()
    const lastNameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const [image, setImage] = useState(null)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    const auth = useContext(AuthContext)

    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    function validateForm() {
        const firstNameValid = firstNameInputRef.current.value.length <= 16
        const lastNameValid = lastNameInputRef.current.value.length <= 16
        const emailValid = emailIsValid(emailInputRef.current.value) && emailInputRef.current.value.length <= 254
        const passwordValid = passwordInputRef.current.value.length >= 6
        const imageValid = image !== null

        return firstNameValid && lastNameValid && emailValid && passwordValid && imageValid
    }

    async function signupUserHandler(event) {
        event.preventDefault()

        if (!validateForm()) {
            setIsFormValid(false)
            return
        }

        setIsFormValid(true)
        setIsSigningUp(true)

        const date = Date.now().toString()

        const formData = new FormData()

        formData.append('firstName', firstNameInputRef.current.value)
        formData.append('lastName', lastNameInputRef.current.value)
        formData.append('email', emailInputRef.current.value)
        formData.append('password', passwordInputRef.current.value)
        formData.append('imageId', date)
        formData.append('image', image, date)

        const response = await fetch('http://localhost:5000/' + 'auth/signup', {
            method: 'POST',
            body: formData
        })

        const data = await response.json()

        auth.login(data.userId, data.token, data.firstName, data.lastName, data.profilePicture, data.email)
    }

    function onImageUpload(isValid, uploadedImage) {
        if (isValid) {
            setImage(uploadedImage)
        }
    }

    return (
        <div className="signupBackdrop">
            <div className="signupPageContainer">
                <form onSubmit={signupUserHandler} className="signupContainer">
                    <p className="signupPageTitle">Welcome to Airbnb</p>

                    <label className="signupLabelContainer">
                        <input className="signupInputContainer" ref={firstNameInputRef} type="text" maxLength="16" placeholder="First name" required />
                    </label>
                    <label className="signupLabelContainer">
                        <input className="signupInputContainer" ref={lastNameInputRef} type="text" maxLength="16" placeholder="Last name"required />
                    </label>
                    <label className="signupLabelContainer">
                        <input className="signupInputContainer" ref={emailInputRef} type="email" maxLength="254" placeholder="Email" required />
                    </label>
                    <label className="signupLabelContainer">
                        <input className="signupInputContainer" ref={passwordInputRef} type="password" minLength="6" placeholder="Password" required />
                    </label>
                    <label className="signupLabelContainer">
                        <ImageUpload onValid={onImageUpload} />
                    </label>
                    <button className="signupSubmitButton" type="submit" disabled={!isFormValid}>Sign Up</button>
                </form>
                {!isFormValid && <p>Please check your inputs and try again.</p>}
            </div>
        </div>
    )
}

export default Signup
