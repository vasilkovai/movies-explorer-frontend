export const BASE_URL = 'https://api.cinemaholic.diploma.nomoredomains.monster';

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}

export const register = (name, password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, password, email})
  })
  .then(checkStatus)
}; 

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkStatus)
};

export const setUserData = (user) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      name: user.name,
      email: user.email,
    })
  })
  .then(checkStatus)
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    credentials: 'include',
  })
  .then(checkStatus)
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
      method: "DELETE",
      credentials: "include",
  })
  .then(checkStatus)
};