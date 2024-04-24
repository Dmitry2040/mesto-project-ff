import './styles/index.css';
import { createCard, toggleLikeState} from './components/card.js';
import { openModal, closeModal} from './components/modal.js';
import { addNewCard, patchProfile, deleteCardApi, getInitialCards, getProfileData, changeAvatar} from './components/api.js'
import { enableValidation, clearValidation} from './components/validation.js';

const places = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const fullScreenImage = popupImage.querySelector('.popup__image');
const fullScreenCaption = popupImage.querySelector('.popup__caption');
const formElementEdit = document.querySelector('.popup__form_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formElementAdd = document.querySelector('.popup__form_add');
const addSubmitBtn = formElementAdd.querySelector('.popup__button');
const editSubmitBtn = formElementEdit.querySelector('.popup__button');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');  
const popupAvatar = document.querySelector('.popup_type_avatar');
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
        };
    profileTitle.textContent = resProfile.name;
    profileDesc.textContent = resProfile.about;
    profileImage.setAttribute('style', `background-image: url(${resProfile.avatar})`);
    })
    .catch((err) => {
        console.error('Ошибка при загрузке данных с сервера:', error)
    })
   
function loadingProcess(btn, isLoading) {
    if (isLoading) {
        btn.textContent = "Сохранение... 🖫";
    } else {
        btn.textContent = "Сохранить";
    }
};

function avatarFormSubmit(evt) {
    evt.preventDefault();
    loadingProcess(popupAvatarBtn, true);
    changeAvatar(avatarUrlInput.value)        
    .then((res) => {
        profileImage.style.backgroundImage = `url('${res.avatar}')`;
        closeModal(popupAvatar);
        popupFormAvatar.reset();
    })
    .catch((err) => {console.error('Ошибка при изменении аватара:', err)})
    .finally(() => {    
        loadingProcess(popupAvatarBtn,false)
    })
}

profileImage.addEventListener('click', () => {
    openModal(popupAvatar);
    clearValidation(popupAvatar, validationConfig);
});

popupAvatar.addEventListener('submit', avatarFormSubmit);

function openImage(name, link) {
    fullScreenImage.src = link;
    fullScreenImage.alt= name;
    fullScreenCaption.textContent = name;
    openModal(popupImage);
};
 
popups.forEach(function(element) { 
    element.classList.add('popup_is-animated');
});

popupCloseBtns.forEach((el) => { 
    el.addEventListener('click', () => {  
        closeModal(el.closest('.popup'));
    });
});

editBtn.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    clearValidation(formElementEdit, validationConfig);
    openModal(popupEdit);
});

addBtn.addEventListener('click', () => { 
    clearValidation(formElementAdd, validationConfig);
    openModal(popupAdd);
});

formElementEdit.addEventListener('submit', editFormSubmit); 
formElementAdd.addEventListener('submit', (evt) => addFormSubmit(evt, validationConfig));

function addFormSubmit(evt, validationConfig) {
    evt.preventDefault(); 
    loadingProcess(addSubmitBtn, true);
    addNewCard(cardNameInput.value,cardUrlInput.value)
    .then((cardData) => {
        places.prepend(createCard(cardData, userId, deleteCardApi, toggleLikeState, openImage));
        formElementAdd.reset();
        closeModal(popupAdd);
        clearValidation(formElementAdd, validationConfig);
    })
    .catch((err) => {
        console.error('Ошибка добавления карточки:', err);
    })
    .finally(() => {    
        loadingProcess(addSubmitBtn,false)
    })
};

function editFormSubmit(evt) {
    evt.preventDefault();
    loadingProcess(editSubmitBtn, true);
    patchProfile(nameInput.value,jobInput.value)
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDesc.textContent = res.about;
        patchProfile(nameInput.value,jobInput.value);
        closeModal(popupEdit);
    })
    .catch((err) => {
        console.error('Ошибка изменения информации профиля:', err);
    })
    .finally(() => {    
        loadingProcess(editSubmitBtn,false)
    })
};

enableValidation(validationConfig);    