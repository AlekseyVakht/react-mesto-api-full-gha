import React from 'react';
import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  openEditAvatar,
  openEditProfile,
  openAddCard,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <button type="button" className="profile__avatar-edit-btn" onClick={openEditAvatar}></button>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-btn" onClick={openEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-btn" onClick={openAddCard}></button>
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => {
            return(
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
            )
          })
        }
        </ul>
      </section>
    </main>
  );
}

export default Main