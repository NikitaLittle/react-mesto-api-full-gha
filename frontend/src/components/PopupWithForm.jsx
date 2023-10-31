function PopupWithForm({ title, name, isOpen, buttonText, onClose, children, onSubmit }) {
  return (
    <div className={`popup ${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <button className='popup__close-button' type='button' aria-label='Закрыть.' onClick={onClose} />
        <form className='popup__form' name={name} onSubmit={onSubmit}>
          <fieldset className='popup__info'>
            <legend className='popup__title'>{title}</legend>
            {children}
          </fieldset>
          <button className='popup__submit-button' type='submit'>
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
