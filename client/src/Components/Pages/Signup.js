import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/Auth-Context";

import ImageUpload from "../Sub-Components/ImageUpload";

import './Signup.css'

function Signup({ closeSignup, showErrorModal }) {
    const firstNameInputRef = useRef()
    const lastNameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const [image, setImage] = useState(null)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isFormValid, setIsFormValid] = useState(true)

    const auth = useContext(AuthContext)

    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    function validateForm() {
        const errors = []

        if (!/^[A-Za-z]+$/.test(firstNameInputRef.current.value) || firstNameInputRef.current.value.length > 16) {
            errors.push("First name must only contain letters and be no longer than 16 characters.")
        }

        if (!/^[A-Za-z]+$/.test(lastNameInputRef.current.value) || lastNameInputRef.current.value.length > 16) {
            errors.push("Last name must only contain letters and be no longer than 16 characters.")
        }

        if (!emailIsValid(emailInputRef.current.value) || emailInputRef.current.value.length > 254) {
            errors.push("Invalid email address. Make sure it's properly formatted and no longer than 254 characters.")
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(passwordInputRef.current.value)) {
            errors.push("Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol and be at least 6 characters long.")
        }

        if (image === null) {
            errors.push("Please upload an image.")
        }

        return errors
      }

    async function signupUserHandler(event) {
        event.preventDefault()

        const errors = validateForm()

        if (errors.length > 0) {
            setIsFormValid(false)
            showErrorModal(errors)
            return
        }

        setIsFormValid(true)
        setIsSigningUp(true)

        const date = Date.now().toString()

        const formData = new FormData()

        formData.append('firstName', firstNameInputRef.current.value)
        formData.append('lastName', lastNameInputRef.current.value)
        formData.append('email', emailInputRef.current.value.toLowerCase())
        formData.append('password', passwordInputRef.current.value)
        formData.append('imageId', date)
        formData.append('image', image, date)

        const response = await fetch('http://localhost:5000/' + 'auth/signup', {
            method: 'POST',
            body: formData
        })

        const data = await response.json()

        if (data.error) {
            showErrorModal([data.error])
        }
        else {
            auth.login(data.userId, data.token, data.firstName, data.lastName, data.profilePicture, data.email)
        }
    }

    function onImageUpload(isValid, uploadedImage) {
        if (isValid) {
            setImage(uploadedImage)
        }
    }

    return (
        <div className="signupBackdrop" onClick={closeSignup}>
            <div className="signupPageContainer">
                <form onSubmit={signupUserHandler} className="signupContainer" onClick={(e) => e.stopPropagation()}>
                    <p className="signupPageTitle">Welcome to Airbnb</p>

                    <label className="signupLabelContainer">
                        <input className="signupInputContainer" ref={firstNameInputRef} type="text" minLength="2" maxLength="16" placeholder="First name" required />
                    </label>
                    <label className="signupLabelContainer">
                        <input className="signupInputContainer" ref={lastNameInputRef} type="text" minLength="2" maxLength="16" placeholder="Last name" required />
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
                    <button className="signupSubmitButton" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
