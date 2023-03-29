import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleSwipeLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const handleSwipeRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
    })

    return (
        <div className="carousel-container" {...swipeHandlers}>
            <img src={images.length > 0 ? "https://airebnb.s3.us-east-2.amazonaws.com/" + images[currentIndex] : null} className="carousel-image" />
        </div>
    )
}

export default ImageCarousel
