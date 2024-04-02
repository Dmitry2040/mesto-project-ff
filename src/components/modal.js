export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEsc);
    modal.addEventListener('click', closeModalByOverlay);
};

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEsc);
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