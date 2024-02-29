import './pages/index.css';
import { initialCards } from './scripts/cards.js'

// @todo: DOM узлы

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
    function createCard (cardData, deleteCard, likeCard, picture) {
    const initialCardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    initialCardsElement.querySelector('.card__title').textContent = cardData.name;
    initialCardsElement.querySelector('.card__image').alt = cardData.name;
    initialCardsElement.querySelector('.card__image').src = cardData.link;
    initialCardsElement.querySelector('.card__like-button').addEventListener('click', likeCard);

    initialCardsElement.querySelector('.card__image').addEventListener('click', picture);

    initialCardsElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(initialCardsElement);
    }); 

    return initialCardsElement;
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
};

function picture (evt) {  
  openPopup(popupTypeImage);
  const card = evt.target.closest('.card');
  const cardSrc = evt.target.getAttribute('src');
  const cardAlt = evt.target.getAttribute('alt');
  const cardTitle = card.querySelector('.card__title').textContent;

  const popupImg = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImg.src = cardSrc;
  popupImg.alt = cardAlt;
  popupCaption.textContent = cardTitle;
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.remove();
};

initialCards.forEach(element => {
    placesList.append(createCard(element, deleteCard, likeCard, picture));
  });

// @todo: Открытие модального окна
  const profileEditButton = document.querySelector('.profile__edit-button'); 
  const popupTypeEdit= document.querySelector('.popup_type_edit');  
  const nameInput = document.querySelector('.popup__input_type_name');  
  const profileTitle = document.querySelector('.profile__title'); 
  const jobInput= document.querySelector('.popup__input_type_description'); 
  const profileDescription = document.querySelector('.profile__description'); 
  const profileAddButton = document.querySelector('.profile__add-button'); 
  const popupTypeNewCard = document.querySelector('.popup_type_new-card');
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupClose = document.querySelectorAll('.popup__close');
  const popups = document.querySelectorAll('.popup');

  function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', EscClose);
    document.addEventListener('click', overlay);
  };

  function openTypeProfile() {
    openPopup(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  };

  profileEditButton.addEventListener("click", openTypeProfile);
  profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));
    
// @todo: Закрытие модального окна

  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.removeEventListener('keydown', EscClose);
    document.removeEventListener('click', overlay);
  };

  popupClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener("click", () => closePopup(popup));
});

function EscClose(evt) {     
  popups.forEach((popup) => {
        if (popup.classList.contains('popup_is-opened') && evt.key === 'Escape')
        closePopup(popup) 
        document.removeEventListener('keydown', EscClose);  
  }  
  )};

function overlay(evt) {     
  popups.forEach((popup) => {
    if (evt.target == popup || popup.contains(evt.target))
       closePopup(popup)    
    }  
  )};
  
// @todo: Редактирование имени и информации о себе

  const formElement = document.forms['edit-profile']; 

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameInput.value;
    jobInput.value;
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit); 

  // @todo: Добавление карточки
  const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
  const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
  const formNewPlace = document.forms['new-place']; 

  function newPlace(evt) {
    evt.preventDefault();

    const newCardData = {
      name: popupInputTypeCardName.value,
      link: popupInputTypeUrl.value,
    };

    const newCardElement = createCard(newCardData, deleteCard, likeCard, picture);
    placesList.prepend(newCardElement);    

    evt.target.reset();
    closePopup(popupTypeNewCard);
};

formNewPlace.addEventListener('submit', newPlace); 



  
