import React, { useState, useRef, useEffect } from "react";

import "./MultipleImageUpload.css";

function MultiImageUpload(props) {
    const [images, setImages] = useState(Array(5).fill(null))
    const [previewUrls, setPreviewUrls] = useState(Array(5).fill(null))
    const [isValid, setIsValid] = useState(Array(5).fill(false))

    const imageRefs = useRef(Array.from({ length: 5 }, () => React.createRef()))

    useEffect(() => {
        images.forEach((image, index) => {
            if (!image) return
            const fileReader = new FileReader()
            fileReader.onload = () => {
            setPreviewUrls((prevUrls) => {
                const updatedUrls = [...prevUrls]
                updatedUrls[index] = fileReader.result
                return updatedUrls
            })
            }

            fileReader.readAsDataURL(image)
        })
    }, [images])

    function chooseImageHandler(event, index) {
        event.preventDefault()
        event.stopPropagation()
        imageRefs.current[index].click()
    }

    function imageUploadClick(event, index) {
        let pickedImage
        let imageIsValid

        if (event.target.files && event.target.files.length === 1) {
            pickedImage = event.target.files[0]
            setImages((prevImages) => {
                const updatedImages = [...prevImages]
                updatedImages[index] = pickedImage
                return updatedImages
            });
            setIsValid((prevIsValid) => {
                const updatedIsValid = [...prevIsValid]
                updatedIsValid[index] = true
                return updatedIsValid
            })
            imageIsValid = true
        }
        else {
            setIsValid((prevIsValid) => {
                const updatedIsValid = [...prevIsValid]
                updatedIsValid[index] = false
                return updatedIsValid
            })

            imageIsValid = false
        }

        props.onValid(imageIsValid, pickedImage, index)
    }

  return (
    <div className="imageUploadContainer">
        {images.map((_, index) => (
            <div key={index}>
                <input
                    className="imageUploadInput"
                    ref={imageRefs.current[index]}
                    type="file"
                    onChange={(event) => imageUploadClick(event, index)}
                    accept=".jpg,.png,.jpeg"
                ></input>
                <div className="imageUploadMainContainer">
                    {previewUrls[index] && (
                        <div className="imageUploadPreview">
                            <img
                            src={previewUrls[index]}
                            alt=""
                            className="imagePreview"
                            />
                        </div>
                    )}
                    <button
                    className="imageUploadButton"
                    onClick={(event) => chooseImageHandler(event, index)}
                    >
                    Choose Image
                    </button>
                </div>
            </div>
        ))}
    </div>
  );
}

export default MultiImageUpload;
