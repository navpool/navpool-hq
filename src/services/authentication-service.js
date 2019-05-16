import {authHeader, handleResponse} from "../helpers";

export const authenticationService = {
  register,
  login,
  logout,
  isLoggedIn,
  refresh,
}

const apiUrl = process.env.REACT_APP_API_URL

function login(username, password, twoFactor) {
  let bodyFormData = new FormData()
  bodyFormData.set("username", username)
  bodyFormData.set("password", password)
  bodyFormData.set("twoFactor", twoFactor)

  const requestOptions = {
    method: 'POST',
    body: bodyFormData,
  }

  return fetch(apiUrl+"/auth/login", requestOptions)
    .then((response) => handleResponse(response))
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user))

      return user
    })
}

function register(username, password, passwordConfirm) {
  let bodyFormData = new FormData()
  bodyFormData.set("username", username)
  bodyFormData.set("password", password)
  bodyFormData.set("passwordConfirm", passwordConfirm)

  const requestOptions = {
    method: 'POST',
    body: bodyFormData,
  }

  return fetch(apiUrl+"/auth/register", requestOptions)
    .then((response) => handleResponse(response))
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user))

      return user
    })
}

function logout() {
  localStorage.removeItem('user')
}

function isLoggedIn() {
  if (!localStorage.getItem('user')) {
    return false;
  }

  let user

  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch(e) {
    logout()
    return false
  }

  if (!user.hasOwnProperty('expire')){
    logout()
    return false
  }

  return new Date(user.expire) > new Date()
}

function refresh() {
  return fetch(apiUrl+"/auth/refresh-token", {
    headers: authHeader()
  })
    .then((response) => handleResponse(response))
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user))

      return user
    })
}