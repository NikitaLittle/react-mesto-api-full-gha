import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <img className='profile__avatar' src={currentUser.avatar} alt='Аватар' />
        <button className='profile__avatar-button' type='button' aria-label='Редактировать фото профиля' onClick={onEditAvatar} />
        <div className='profile__info'>
          <div className='profile__initials'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button className='profile__edit-button' type='button' aria-label='Редактировать.' onClick={onEditProfile} />
          </div>
          <p className='profile__description'>{currentUser.about}</p>
        </div>
        <button className='profile__add-button' type='button' aria-label='Добавить.' onClick={onAddPlace} />
      </section>
      <section className='cards'>
        {cards.map((card) => {
          return <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} key={card._id} onCardDelete={onCardDelete} />;
        })}
      </section>
    </main>
  );
}

export default Main;
