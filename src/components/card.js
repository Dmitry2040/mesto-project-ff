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



  // if (btn.classList.contains('card__like-button_is-active')) {
  //   deleteCardLike(cardId)
  // } else {
  //   putCardLike(cardId)
  // }
  // btn.classList.toggle('card__like-button_is-active');
  
  // // patchCardLike(cardId);
   
  //  counter.textContent = card.likes.length;
   
}




// export function createCard({name, link, id}, deleteCallBack, likeCallBack, openImageCallBack) {
//     const cardTemplate = document.querySelector('#card-template').content;
//     const cardElement = cardTemplate.cloneNode(true);
//     cardElement.querySelector('.card__title').textContent = name;
//     cardElement.querySelector('.card__image').src = link;
//     cardElement.querySelector('.card__image').alt = name;
//     const cardImage = cardElement.querySelector('.card__image');
//     const deleteButton = cardElement.querySelector('.card__delete-button');
//     const likeBtn = cardElement.querySelector('.card__like-button');
//     deleteButton.addEventListener('click', () => { deleteCallBack(id) });
//     cardImage.addEventListener('click', () => { openImageCallBack({name, link})});
//     likeBtn.addEventListener('click', likeCallBack);
//     return cardElement;
//   };
  
  
  // export function removeElement(evt) {
  //   evt.target.closest('.card').remove();
  // };
    
  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  };
  