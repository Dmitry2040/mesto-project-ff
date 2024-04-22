
import './styles/index.css';
import { createCard, toggleLikeState} from './components/card.js';
import { openModal, closeModal} from './components/modal.js';
import { addNewCard, patchProfile, deleteCardApi, getInitialCards, getProfileData, changeAvatar} from './components/api.js'

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
   
// for (let i=0; i< initialCards.length; i++) {
//     places.append(createCard(initialCards[i], removeElement, likeCard, openImage));
// };

function loadingProcess(btn, isLoading) {
    if (isLoading) {
      btn.textContent = "Сохранение... 🖫";
    } else {
      btn.textContent = "Сохранить";
    }
  };

const popupAvatar = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');
const popupAvatarBtn = popupAvatar.querySelector('.popup__button');
const popupFormAvatar = popupAvatar.querySelector('.popup__form_edit-avatar');
const avatarUrlInput = popupAvatar.querySelector(".popup__input_type_url");

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
        places.prepend(createCard(cardData , userId, deleteCardApi, toggleLikeState, openImage));
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


    

// getInitialCards()
//   .then((result) => {
//     for (let i=0; i< result.length; i++) {
//         places.append(createCard(result[i], removeElement, likeCard, openImage));
//     };
//   })
//    .catch((err) => {
//     console.log(err); // выводим ошибку в консоль
//   }); 


// getProfileData()
//   .then((result) => {
//     document.querySelector('.profile__title').textContent = result.name;
//     document.querySelector('.profile__description').textContent = result.about;
//     document.querySelector('.profile__image').setAttribute('style', `background-image: url(${result.avatar})`)
//   })