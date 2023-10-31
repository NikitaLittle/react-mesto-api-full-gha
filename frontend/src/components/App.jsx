import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isMessage, setMessage] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch(console.log());

    auth
      .getToken(jwt)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch(() => {
        setLoggedIn(false);
        navigate('/sign-in');
      });
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(console.log());
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c !== card));
      })
      .catch(console.log());
  }

  function handleUpdateUser(onUpdateUser) {
    api
      .setUserInfo({ name: onUpdateUser.name, about: onUpdateUser.about })
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch(console.log());
  }

  function handleUpdateAvatar(onUpdateAvatar) {
    api
      .setUserAvatar(onUpdateAvatar.avatar)
      .then((updateAvatar) => {
        setCurrentUser(updateAvatar);
        closeAllPopups();
      })
      .catch(console.log());
  }

  function handleAddPlaceSubmit(onAddPlace) {
    api
      .addNewCard({ name: onAddPlace.name, link: onAddPlace.link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log());
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setMessage(true);
        setInfoTooltip(true);
        navigate('/sign-in');
      })
      .catch(() => {
        setMessage(false);
        setInfoTooltip(true);
      });
  }

  function handleAuthenticationSubmit(email, password) {
    auth
      .authentication(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setEmail(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch(() => {
        setMessage(false);
        setInfoTooltip(true);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} />
        <Routes>
          <Route path='*' element={loggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-in' replace />} />
          <Route path='/sign-in' element={<Login onSubmit={handleAuthenticationSubmit} />} />
          <Route path='/sign-up' element={<Register onSubmit={handleRegisterSubmit} />} />
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                exact
              />
            }
          />
          <Route />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} isMessage={isMessage} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
