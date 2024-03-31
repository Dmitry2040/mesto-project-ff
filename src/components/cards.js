

export const initialCards = [
    {
      name: "Архыз",
      link: "https://a.d-cd.net/jgAAAgE3SuA-1920.jpg",
    },
    {
      name: "Эльбрус",
      link: "https://minturizm.kbr.ru/upload/iblock/32a/gnv6u1ixlg4kimc64wf6bp5ayitqye6u/TAY02253.JPG",
    },
    {
      name: "Шерегеш",
      link: "https://sportishka.com/uploads/posts/2022-11/1667570694_1-sportishka-com-p-dostoprimechatelnosti-sheregesha-vkontakte-2.jpg",
    },
    {
      name: "Красная Поляна",
      link: "https://ki-news.ru/wp-content/uploads/2021/01/dsc03069-panorama111.e8a5e2854339bd30b585b14ce926a012.jpg",
    },
    {
      name: "Домбай",
      link: "https://api.gzktour.ru/storage/media/65018/635bab0e0f9ad.png",
    },
    {
      name: "Хибины",
      link: "https://www.ski.ru/kohana/upload/ckfinder_images/u61174/images/%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D1%81%D0%BA.jpg",
    }
]

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
