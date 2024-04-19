export function openModal(modal, validationConfig) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEsc);
    modal.addEventListener('click', closeModalByOverlay);
  
};

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEsc);
    // modal.querySelectorAll('.form__input-error').forEach(el =>
    //     el.textContent = '');
    // modal.querySelectorAll('.popup__input').forEach(el => el.classList.remove('form__input_type_error'));
};

export function closeModalByOverlay(evt) {
    if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
    }; 
};

function closeModalByEsc(evt) {
    if (evt.key == 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
    };
};