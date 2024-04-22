const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: '6372d1e7-c303-4443-93dd-9338f59b02c2',
      'Content-Type': 'application/json'
    }
  }

const handleResponse = (res) => {
if (res.ok) {
    return res.json();
}
return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log('Ошибка инициализации карточек', err);
    })
} 

export const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log('Ошибка получения данных профиля', err);
    })
}

  export const patchProfile = (nameInput, jobInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput,
            about: jobInput
        })
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log('Ошибка изменения данных профиля', err);
    })
}

export const addNewCard = (cardName, cardUrl) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardUrl,
            })
        })
        .then((res) => handleResponse(res))
        .catch((err) => {
            console.log('Ошибка добавления новой карточки', err);
        })
    }

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log('Ошибка удаления карточки', err);
    })
}

export const putCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res)=> handleResponse(res))
    .catch((err) => {
        console.log('Ошибка добавления лайка', err);
    })
}

export const deleteCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res)=> handleResponse(res))
    .catch((err) => {
        console.log('Ошибка удаления лайка', err);
    })
}

export const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log('Ошибка обновления аватара', err);
    })
  };