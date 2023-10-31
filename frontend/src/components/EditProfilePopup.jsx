import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title='Редактировать профиль' name='profile-popup' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className='popup__inputs-container'>
        <div className='popup__input-error-container'>
          <input
            className='popup__input profile-popup__input profile-popup__input_field_name'
            id='popup-input-name'
            type='text'
            name='name'
            placeholder='Имя'
            minLength={2}
            maxLength={40}
            required=''
            value={name}
            onChange={handleNameChange}
          />
          <span className='popup__input-error popup-input-name-error' />
        </div>
        <div className='popup__input-error-container'>
          <input
            className='popup__input profile-popup__input profile-popup__input_field_description'
            id='popup-input-description'
            type='text'
            name='description'
            placeholder='О себе'
            minLength={2}
            maxLength={200}
            required=''
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className='popup__input-error popup-input-description-error' />
        </div>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
