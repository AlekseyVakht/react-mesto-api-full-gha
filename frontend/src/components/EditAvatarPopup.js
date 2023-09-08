import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');
  
  React.useEffect(() => {
    if (!props.isOpen) {
      avatarRef.current.value=''
    }
  }, [props.isOpen])
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }



  return (
    <PopupWithForm
      title={"Обновить аватар"}
      btn={"Сохранить"}
      name={"avatar-change"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <div className="popup__input-field">
          <input
            id="avatar-input"
            ref={avatarRef}
            type="url"
            placeholder="URL"
            name="avatar"
            minLength="2"
            className="popup__form-item popup__form-item_input_avatar"
            required
          />
          <span className="avatar-input-error popup__input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup