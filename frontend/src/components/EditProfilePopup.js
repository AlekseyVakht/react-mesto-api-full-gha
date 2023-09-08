import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      btn={"Сохранить"}
      name={"edit"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <div className="popup__input-field">
          <input
            id="name-input"
            type="text"
            placeholder="Имя"
            value={name || ''}
            onChange={handleChangeName}
            name="name"
            minLength="2"
            maxLength="40"
            className="popup__form-item popup__form-item_input_name"
            required
          />
          <span className="name-input-error popup__input-error"></span>
        </div>
        <div className="popup__input-field">
          <input
            id="description-input"
            type="text"
            placeholder="О себе"
            value={description || ''}
            onChange={handleChangeAbout}
            name="about"
            minLength="2"
            maxLength="200"
            className="popup__form-item popup__form-item_input_job"
            required
          />
          <span className="description-input-error popup__input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;