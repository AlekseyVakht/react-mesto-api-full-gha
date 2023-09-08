import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like-icon ${isLiked && 'element__like-icon_active'}` 
      );

    function handleClick(){
        onCardClick(card);
    }

    function handleCardLike(){
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            {isOwn && <button type="button" className="element__delete-icon" onClick={handleCardDelete}/>}
            <div className="element__image-mask">
                <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
            </div>
            <div className="element__container">
                <h2 className="element__heading">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card