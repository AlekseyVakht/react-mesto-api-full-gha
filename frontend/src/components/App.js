import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import "../index.css";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from './InfoTooltip';
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";
import * as Auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [infoText, setInfoText] = useState([]);
  const [infoImg, setInfoImg] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      Auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/');
          Promise.all([api.getUserInfoApi(localStorage.token), api.getCards(localStorage.token)])
          .then(([user, cards]) => {
            setCurrentUser(user);
            setEmail(user.email);
            setCards(cards);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleInfoTooltipOpen({text, img}) {
    setInfoToolTipOpen(true);
    setInfoText(text);
    setInfoImg(img);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id, localStorage.token)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id); 
    api.changeLikeCard(card._id, isLiked, localStorage.token)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  });
  }

  function handleUpdateUser({name, about}) {
    api
      .patchProfile({name, about}, localStorage.token)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar, localStorage.token)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(card) {
    api
      .postCard(card, localStorage.token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function signOut() {
    localStorage.removeItem("token");
    setCurrentUser({});
    setCards([]);
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          text={infoText}
          img={infoImg}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProtectedRouteElement
                  element={Header}
                  text={"Выйти"}
                  email={email}
                  onClick={signOut}
                  loggedIn={loggedIn}
                />
                <ProtectedRouteElement
                  element={Main}
                  openAddCard={handleAddPlaceClick}
                  openEditAvatar={handleEditAvatarClick}
                  openEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  currentUser={currentUser}
                  cards={cards}
                  loggedIn={loggedIn}
                />
                <ProtectedRouteElement
                  element={EditProfilePopup}
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  loggedIn={loggedIn}
                />
                <ProtectedRouteElement
                  element={EditAvatarPopup}
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  loggedIn={loggedIn}
                />
                <ProtectedRouteElement
                  element={AddPlacePopup}
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlace}
                  card={cards}
                  loggedIn={loggedIn}
                />
                <ProtectedRouteElement
                  element={PopupWithForm}
                  title={"Вы уверены?"}
                  btn={"Да"}
                  name={"with-confirm"}
                  loggedIn={loggedIn}
                />
                <ProtectedRouteElement
                  element={ImagePopup}
                  card={selectedCard}
                  isOpen={isImagePopupOpen}
                  onClose={closeAllPopups}
                  loggedIn={loggedIn}
                />
                <ProtectedRouteElement element={Footer} loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header text={"Войти"} onClick={() => navigate('/sign-in', { replace: true })} />
                <Register handleInfoTooltipOpen={handleInfoTooltipOpen} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header text={"Регистрация"} onClick={() => navigate('/sign-up', { replace: true })} />
                <Login handleLogin={handleLogin} />
              </>
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
