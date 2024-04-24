import { deleteCardLike, putCardLike } from "./api";

export function createCard(card, userId, deleteCallBack, likeCallBack, openImageCallBack) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  const cardId = card._id;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-button-counter');
  likeCounter.textContent = card.likes.length;
  if (card.owner._id !== userId) {
    deleteButton.setAttribute('style', 'display:none'); 
  };
  deleteButton.addEventListener('click', () => { 
    deleteCallBack(cardId)
    .then(() => {
      deleteButton.closest('.card').remove();
    })
    .catch((err) => {
      console.error('Ошибка удаления карточки:', err);
    })
  });
  cardImage.addEventListener('click', () => { 
    openImageCallBack(card.name, card.link)
  });
  if (card.likes.some(like => (like._id === userId))) {
    likeBtn.classList.add('card__like-button_is-active');
  };
  likeBtn.addEventListener('click', () => likeCallBack(cardId, likeBtn, likeCounter));
  return cardElement;
};

export function toggleLikeState(cardId, btn, counter) {
  const isLiked = btn.classList.contains("card__like-button_is-active");
  const likeToggle = isLiked ? deleteCardLike : putCardLike;
  likeToggle(cardId)
  .then((res) => {
    btn.classList.toggle('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
  .catch((error) => {
    console.error('Ошибка при изменении статуса лайка:', error);
  });
}