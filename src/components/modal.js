export function openModal(evt) {
    evt.classList.add('popup_is-opened');
};

export function closeModal(modal) {modal.forEach(function(evt) {
    evt.classList.remove('popup_is-opened');
})};