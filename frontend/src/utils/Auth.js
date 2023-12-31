const baseUrl = "https://alekseyvakht-mesto-db.nomoredomainsicu.ru";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email }),
  })
    .then(res => checkResponse(res))
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res))
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => checkResponse(res))
    .then(data => data)
  } 