import union from '../images/union.svg';
import unionFalse from '../images/unionFalse.svg';

function InfoTooltip({ name, isOpen, onClose, isMessage }) {
  return (
    <div className={`popup ${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container popup__container-infotooltip'>
        <button className='popup__close-button' type='button' aria-label='Закрыть.' onClick={onClose} />
        <img src={isMessage ? union : unionFalse} />
        <p className='popup__title'>{isMessage ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
