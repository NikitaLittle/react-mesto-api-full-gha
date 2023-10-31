import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm title='Обновить аватар' name='update-avatar-popup' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className='popup__inputs-container'>
        <div className='popup__input-error-container'>
          <input
            className='popup__input update-avatar-popup__input update-avatar-popup__input_field_link'
            id='popup-input-avatar-link'
            type='text'
            name='link'
            placeholder='Ссылка'
            minLength={2}
            required=''
            ref={ref}
          />
          <span className='popup__input-error popup-input-avatar-link-error' />
        </div>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
