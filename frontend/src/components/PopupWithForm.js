import React from 'react';

function PopupWithForm(props) {
  const popupClass = `popup ${props.isOpen ? 'popup_opened' : ''}`
  
  return (
      <div id={`popup-${props.name}`} className={popupClass}>
        <div className="popup__container">
          <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
          <h3 className="popup__heading">{props.title}</h3>
          <form id={`popup-${props.name}-form`} name={`popup-${props.name}`} className="popup__form" onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button type="submit" className="popup__submit-btn">{props.btn}</button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm