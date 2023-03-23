import React, { useState } from "react"

import './ErrorModal.css'

function ErrorModal({ errors, closeModal }) {
    return (
        <div className="errorModalBackDrop" onClick={(e) => {e.stopPropagation(); closeModal();}}>
            <div className="errorModal" onClick={(e) => e.stopPropagation()}>
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ErrorModal
