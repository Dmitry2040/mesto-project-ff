import './styles/index.css';
import { createCard, toggleLikeState} from './components/card.js';
import { openModal, closeModal} from './components/modal.js';
import { addNewCard, patchProfile, deleteCardApi, getInitialCards, getProfileData, changeAvatar} from './components/api.js'
import {enableValidation, clearValidation} from './components/validation.js';

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
const popupAvatar = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');
const popupAvatarBtn = popupAvatar.querySelector('.popup__button');
const popupFormAvatar = popupAvatar.querySelector('.popup__form_edit-avatar');
const avatarUrlInput = popupAvatar.querySelector(".popup__input_type_url");

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorInactive: '.form__input-error'
}

let cardData = {};
let userId;

Promise.all([getInitialCards(), getProfileData()])
.then(([resCards, resProfile]) => {
        cardData = resCards;
        userId = resProfile._id;
        for (let i=0; i< resCards.length; i++) { 
        places.append(createCard(resCards[i], resProfile._id, deleteCardApi, toggleLikeState ,openImage));
        document.querySelectorAll('.card__like-button-counter')[i].textContent = resCards[i].likes.length;
        if (resCards[i].owner._id !== resProfile._id) {
        document.querySelectorAll('.card__delete-button')[i].setAttribute('style', 'display:none'); 
        };
    };
    document.querySelector('.profile__title').textContent = resProfile.name;
    document.querySelector('.profile__description').textContent = resProfile.about;
    document.querySelector('.profile__image').setAttribute('style', `background-image: url(${resProfile.avatar})`);
    })
.catch((err) => {console.log(err)})
   
function loadingProcess(btn, isLoading) {
    if (isLoading) {
      btn.textContent = "Сохранение... 🖫";
    } else {
      btn.textContent = "Сохранить";
    }
};

function openAvatarModal() {
    openModal(popupAvatar);
}

function avatarFormSubmit(evt) {
    evt.preventDefault();
    loadingProcess(popupAvatarBtn, true);
    changeAvatar(avatarUrlInput.value)        
    .then((res) => {
        profileImage.style.backgroundImage = `url('${res.avatar}')`;
        closeModal(popupAvatar);
        popupFormAvatar.reset();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {    
        loadingProcess(popupAvatarBtn,false)
    })
}

profileImage.addEventListener('click', openAvatarModal);
popupAvatarBtn.addEventListener('click', avatarFormSubmit);

function openImage(name, link) {
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
    addNewCard(cardNameInput.value,cardUrlInput.value)
     .then((cardData) => {
        places.prepend(createCard(cardData, userId, deleteCardApi, toggleLikeState, openImage));
    })
    formElementAdd.reset();
    clearValidation(formElementAdd, validationConfig);
    popupAdd.classList.remove('popup_is-opened');
};

function editFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    patchProfile(nameInput.value,jobInput.value);
    popupEdit.classList.remove('popup_is-opened');
};

enableValidation(validationConfig);    