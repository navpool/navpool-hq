import {authHeader, handleResponse} from "../helpers";

export const accountService = {
  getAccount,
  changePassword,
  activateTwoFactor,
  enableTwoFactor,
  disableTwoFactor,
}

const apiUrl = process.env.REACT_APP_API_URL

function getAccount() {


  return fetch(apiUrl+"/account", {
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(account => {
      return account;
    })
}

function changePassword(currentPassword, newPassword, confirmPassword) {
  return fetch("http://localhost:8085/account/password", {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({currentPassword, newPassword, confirmPassword})
  })
    .then((response) => handleResponse(response, true))
    .then(() => {
      return true;
    })
}

function activateTwoFactor() {
  return fetch("http://localhost:8085/2fa/activate", {
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(twoFactor => {
      return twoFactor;
    })
}

function enableTwoFactor(verificationCode) {
  return fetch('http://localhost:8085/2fa/enable', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({code: verificationCode})
  })
    .then(response => handleResponse(response, true))
    .then(() => {
      return true
    })
}

function disableTwoFactor(verificationCode) {
  return fetch('http://localhost:8085/2fa/disable', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({code: verificationCode})
  })
    .then(response => handleResponse(response, true))
    .then(() => {
      return true
    })
}
