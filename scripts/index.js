const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places__list');
 
function createCard({name, link}, deleteCallBack) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCallBack);
    return cardElement;
};

function removeElement(evt) {
    evt.target.closest('.card').remove();
};
    
for (let i=0; i< initialCards.length; i++) {
    places.append(createCard(initialCards[i], removeElement));
} ;
