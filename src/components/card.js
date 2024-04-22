import { deleteCardLike, putCardLike } from "./api";

export function createCard(card, userId, deleteCallBack, likeCallBack, openImageCallBack) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  const cardId = card._id;
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-button-counter');
  likeCounter.textContent = card.likes.length;
  deleteButton.addEventListener('click', () => { deleteCallBack(cardId)
    .then(() => {
      deleteButton.closest('.card').remove();
    })  });
  cardImage.addEventListener('click', () => { openImageCallBack(card.name, card.link)});
  if (card.likes.some(like => (like._id === userId))) {
    likeBtn.classList.add('card__like-button_is-active');
   };
  likeBtn.addEventListener('click', () => likeCallBack(cardId, likeBtn, likeCounter));
 
  return cardElement;
};

export function toggleLikeState(cardId, btn, counter) {
  const isLiked = btn.classList.contains("card__like-button_is-active");
  const likeToggle = isLiked ? deleteCardLike : putCardLike;

  likeToggle(cardId).then((res) => {
    btn.classList.toggle('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
  .catch((error) => {
    console.error('Ошибка при  изменении статуса лайка:', error);
  });
}