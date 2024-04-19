
import { initialCards } from './components/cards.js';
import './styles/index.css';
import { createCard, removeElement, likeCard} from './components/card.js';
import { openModal, closeModal, closeModalByOverlay} from './components/modal.js';

const places = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupCloseBtn = document.querySelectorAll('.popup__close');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const formElementEdit = document.querySelector('.popup__form_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formElementAdd = document.querySelector('.popup__form_add');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');  
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorInactive: '.form__input-error'
  }



for (let i=0; i< initialCards.length; i++) {
    places.append(createCard(initialCards[i], removeElement, likeCard, openImage));
};

function openImage({name, link}) {
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__image').alt= name;
    popupImage.querySelector('.popup__caption').textContent = name;
    openModal(popupImage);
};
 
popups.forEach(function(element) { 
    element.classList.add('popup_is-animated');
});

popupCloseBtn.forEach((el) => { 
    el.addEventListener('click', () => {  
    closeModal(el.closest('.popup'));
    });
});

editBtn.addEventListener('click', () => {
    popupEdit.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    popupEdit.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
    clearValidation(formElementEdit, validationConfig);
    openModal(popupEdit);
});

addBtn.addEventListener('click', () => { 
    openModal(popupAdd);
});

formElementEdit.addEventListener('submit', editFormSubmit); 
formElementAdd.addEventListener('submit', (evt) => addFormSubmit(evt, validationConfig));

function addFormSubmit(evt, validationConfig) {
    evt.preventDefault(); 
    places.prepend(createCard({name: cardNameInput.value, link: cardUrlInput.value}, removeElement, likeCard, openImage));
    clearValidation(formElementAdd, validationConfig);
    formElementAdd.reset();
   
    // popupAdd.querySelector('.popup__button').classList.add('popup__button_disabled');
    popupAdd.classList.remove('popup_is-opened');
};

function editFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    popupEdit.classList.remove('popup_is-opened');
};




function isValid(formElement, inputElement, config) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    };
   
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }

  }; 

function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };  

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}; 

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}; 

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config); 
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}; 

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
});
};

function clearValidation(formElement, config) {
    formElement.querySelectorAll(config.errorInactive).forEach(el =>
        el.textContent = '');
    formElement.querySelectorAll(config.inputSelector).forEach(el =>
        el.classList.remove(config.inputErrorClass));
    formElement.querySelector(config.submitButtonSelector).disabled = true;
    formElement.querySelector(config.submitButtonSelector).classList.add(config.inactiveButtonClass);
    
}

enableValidation(validationConfig); 

