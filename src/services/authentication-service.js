import {handleResponse} from "../helpers";

export const authenticationService = {
  login,
  logout,
  isLoggedIn
}

function login(username, password, twoFactor) {
  let bodyFormData = new FormData()
  bodyFormData.set("username", username)
  bodyFormData.set("password", password)
  bodyFormData.set("twoFactor", twoFactor)

  const requestOptions = {
    method: 'POST',
    body: bodyFormData,
  }

  const url = "http://localhost:8085" //process.env.API_URL

  return fetch(url + '/auth/login', requestOptions)
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