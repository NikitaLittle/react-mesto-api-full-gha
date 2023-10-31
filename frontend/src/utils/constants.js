// Объекты профиля документа
const profileAvatarButton = document.querySelector('.profile__avatar-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');
// Объекты мест
const cardTemplate = document.querySelector('.card__template').content;
// Объекты "профиль" попап
const profilePopUp = document.querySelector('.profile-popup');
const profilePopUpForm = profilePopUp.querySelector('[name="profileForm"]');
const profilePopUpName = profilePopUp.querySelector('.profile-popup__input_field_name');
const profilePopUpDescription = profilePopUp.querySelector('.profile-popup__input_field_description');
// Объекты "добавить" попап
const addingPopupSelector = '.adding-popup';
const addingPopUp = document.querySelector('.adding-popup');
const addingPopUpForm = addingPopUp.querySelector('[name="addForm"]');
const addingInputTitle = addingPopUp.querySelector('.adding-popup__input_field_title');
const addingInputLink = addingPopUp.querySelector('.adding-popup__input_field_link');
//
const avatarPopup = document.querySelector('.update-avatar-popup');
const avatarPopupForm = avatarPopup.querySelector('[name="updateAvatarForm"]');
// Селекторы и классы валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export {
  profileAvatarButton,
  profileEditButton,
  profileName,
  profileDescription,
  profileAddButton,
  cardTemplate,
  profilePopUpForm,
  profilePopUpName,
  profilePopUpDescription,
  addingPopupSelector,
  addingPopUp,
  addingPopUpForm,
  addingInputTitle,
  addingInputLink,
  avatarPopup,
  avatarPopupForm,
  config,
};
