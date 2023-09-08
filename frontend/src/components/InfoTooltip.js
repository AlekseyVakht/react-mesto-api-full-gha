import React from 'react';

function InfoTooltip(props) {
    const img = props.img;
    const popupClass = `popup ${props.isOpen ? 'popup_opened' : ''}`
    return (
        <div id='popup-infotooltip' className={popupClass}>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <img className='popup__infotooltip-img' src={img} alt='info'/>
                <h3 className="popup__infotooltip-heading">{props.text}</h3>
            </div>
        </div>
    );
}

export default InfoTooltip