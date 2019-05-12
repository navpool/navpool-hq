import {handleResponse} from "../helpers";

export const authenticationService = {
  login,
  logout,
  isLoggedIn
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

function logout() {
  localStorage.removeItem('user')
}

function isLoggedIn() {
  return !!localStorage.getItem('user')
}