
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
    element.addEventListener('click', closeModalByOverlay);
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
    openModal(popupEdit);
});

addBtn.addEventListener('click', () => { 
    openModal(popupAdd);
});

formElementEdit.addEventListener('submit', editFormSubmit); 
formElementAdd.addEventListener('submit', addFormSubmit);

function addFormSubmit(evt) {
    evt.preventDefault(); 
    places.prepend(createCard({name: cardNameInput.value, link: cardUrlInput.value}, removeElement, likeCard, openImage));
    formElementAdd.reset();
    popupAdd.classList.remove('popup_is-opened');
};

function editFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    popupEdit.classList.remove('popup_is-opened');
};

