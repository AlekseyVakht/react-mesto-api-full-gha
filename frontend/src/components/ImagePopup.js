import React from 'react';

function ImagePopup({card, isOpen, onClose}) {
    const popupClass = `popup popup_opacity_darker ${isOpen ? 'popup_opened' : ''}`
    return (
        <div id="popup-image-scaler" className={popupClass}>
            <figure className="popup__image-container">
                <button type="button" className="popup__close-icon" onClick={onClose}></button>
                <img className="popup__image" src={card?.link} alt={card?.name} />
                <figcaption className="popup__image-capture">{card?.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup