import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm title='Новое место' name='adding-popup' isOpen={isOpen} onClose={onClose} buttonText={'Создать'} onSubmit={handleSubmit}>
      <div className='popup__inputs-container'>
        <div className='popup__input-error-container'>
          <input
            className='popup__input adding-popup__input adding-popup__input_field_title'
            id='popup-input-place-name'
            type='text'
            name='name'
            placeholder='Название'
            minLength={2}
            maxLength={30}
            required=''
            value={name}
            onChange={handleNameChange}
          />
          <span className='popup__input-error popup-input-place-name-error' />
        </div>
        <div className='popup__input-error-container'>
          <input
            className='popup__input adding-popup__input adding-popup__input_field_link'
            id='popup-input-place-link'
            type='usernameData'
            name='link'
            placeholder='Ссылка на картинку'
            required=''
            value={link}
            onChange={handleLinkChange}
          />
          <span className='popup__input-error popup-input-place-link-error' />
        </div>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
