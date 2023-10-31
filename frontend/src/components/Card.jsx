import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_active'}`;

  return (
    <article className='card'>
      <img className='card__image' src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <button className='card__urn-button' type='button' aria-label='Удалить.' onClick={handleDeleteClick} />}
      <div className='card__description'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__likes-container'>
          <button className={cardLikeButtonClassName} type='button' aria-label='Нравится.' onClick={handleLikeClick} />
          <span className='card__number-likes'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
