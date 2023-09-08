import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => {
    if (!props.isOpen) {
      setCardName('');
      setCardLink('');
    }
  }, [props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink
    });
  }

  function handleCardName(evt) {
    setCardName(evt.target.value)
  }

  function handleCardLink(evt) {
    setCardLink(evt.target.value)
  }
  return (
    <PopupWithForm
      title={"Новое место"}
      btn={"Создать"}
      name={"new-place"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <div className="popup__input-field">
          <input
            id="place-input"
            type="text"
            placeholder="Название"
            name="name"
            value={cardName || ''}
            minLength="2"
            maxLength="30"
            className="popup__form-item popup__form-item_input_place"
            onChange={handleCardName}
            required
          />
          <span className="place-input-error popup__input-error"></span>
        </div>
        <div className="popup__input-field">
          <input
            id="url-input"
            type="url"
            placeholder="Ссылка на картинку"
            value={cardLink || ''}
            name="link"
            className="popup__form-item popup__form-item_input_link"
            onChange={handleCardLink}
            required
          />
          <span className="url-input-error popup__input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup