import React, { useState, useRef, useEffect } from "react";

import './ImageUpload2.css'

function ImageUpload2(props) {
    const [image, setImage] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const imageRef = useRef()

    useEffect(() => {
        if (!image) return
        const fileReader = new FileReader()

        fileReader.onload = () => {
            const imageUrl = fileReader.result
            setPreviewUrl(imageUrl)
            props.onImageSelected(image)
        }

        fileReader.readAsDataURL(image)
    }, [image])

    function chooseImageHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        imageRef.current.click()
    }

    function imageUploadClick(event) {
        let pickedImage
        let imageIsValid

        if (event.target.files && event.target.files.length === 1) {
            pickedImage = event.target.files[0]
            setImage(pickedImage)
            setIsValid(true)
            imageIsValid = true
        }
        else {
            setIsValid(false)
            imageIsValid = false
        }

        props.onValid(imageIsValid, pickedImage)
    }

    return (
        <div className="imageUploadContainer2">
            <input className="imageUploadInput2" ref={imageRef} type="file" onChange={imageUploadClick} accept=".jpg,.png,.jpeg"></input>
            <div className="imageUploadMainContainer2">
                {previewUrl && <div className="imageUploadPreview2">
                    <img src={previewUrl} alt="" className="imagePreview2"/>
                </div>}
                {!previewUrl && <button className="imageUploadButton2" onClick={chooseImageHandler}>Choose Image</button>}
            </div>
        </div>
    )
}

export default ImageUpload2
