class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _isResOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfoApi(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { 
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => this._isResOk(res))
  }

  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { 
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => this._isResOk(res))
  }

  patchProfile({name, about}, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { 
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
      .then(res => this._isResOk(res))
  }

  postCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { 
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(res => this._isResOk(res))
  };

  setAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { 
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._isResOk(res))
  };

  changeLikeCard(_id, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: { 
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => this._isResOk(res))
  }

  deleteCardApi(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: { 
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => this._isResOk(res))
  }

  // addCardLike(_id, token) {
  //   return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
  //     method: 'PUT',
  //     headers: { 
  //       authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   .then(res => this._isResOk(res))
  // }

  // removeCardLike(_id, token) {
  //   return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
  //     method: 'DELETE',
  //     headers: { 
  //       authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   .then(res => this._isResOk(res))
  // }
}

export const api = new Api({
  baseUrl: 'https://alekseyvakht-mesto-db.nomoredomainsicu.ru/',
  headers: {
    'Content-Type': 'application/json',
  }
});