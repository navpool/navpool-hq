import { handleResponse } from '../helpers/handle-response'
let jwt = require('jsonwebtoken')


export const AuthenticationService = {
  login,
  logout,
  isAuthenticated,
  getToken,
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

  const url = "http://localhost:8085" //process.env.NAVPOOL_API_URL

  return fetch(url + '/auth/login', requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user))

      return user
    })
}

function logout() {
  localStorage.removeItem('currentUser')
}

function isAuthenticated() {
  const currentUser = getUser()
  if (currentUser == null) {
    return false
  }

  let decodedToken = jwt.decode(currentUser.token)

  return decodedToken.exp > (Date.now()/1000)
}

function getToken() {
  const currentUser = getUser()
  if (currentUser == null) {
    return null
  }

  return currentUser.token
}

function getUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (currentUser == null) {
    return null
  }

  return currentUser
}