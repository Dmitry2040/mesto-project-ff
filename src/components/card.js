export function createCard({name, link}, deleteCallBack, likeCallBack, openImageCallBack) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');
    deleteButton.addEventListener('click', deleteCallBack);
    cardImage.addEventListener('click', () => {openImageCallBack({name, link})});
    likeBtn.addEventListener('click', likeCallBack);
    return cardElement;
  };
  
  export function removeElement(evt) {
    evt.target.closest('.card').remove();
  };
    
  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  };
  