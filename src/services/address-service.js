import {authHeader, handleResponse} from "../helpers";

export const addressService = {
  getAddresses,
  addAddress,
  removeAddress,
}

const apiUrl = process.env.REACT_APP_API_URL

function getAddresses() {
  return fetch(apiUrl+"/address", {
    headers: authHeader()
  })
    .then(response => handleResponse(response, true))
    .then(addresses => {
      return addresses;
    })
}

function addAddress(hash, signature) {
  return fetch(apiUrl+"/address", {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({hash, signature})
  })
    .then((response) => handleResponse(response, true))
    .then(address => {
      return address
    })
}

function removeAddress(address) {
  return fetch(apiUrl+"/address", {
    method: 'DELETE',
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(address => {
      return address
    })
}
