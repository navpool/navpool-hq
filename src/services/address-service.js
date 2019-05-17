import {authHeader, handleResponse} from "../helpers";

export const addressService = {
  getAddress,
  getAddresses,
  addAddress,
  removeAddress,
}

const apiUrl = process.env.REACT_APP_API_URL

function getAddress(id) {
  return fetch(apiUrl+"/address/"+id, {
    headers: authHeader()
  })
    .then(response => handleResponse(response, true))
    .then(address => {
      return address;
    })
}

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

function removeAddress(id) {
  return fetch(apiUrl+"/address/"+id, {
    method: 'DELETE',
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(address => {
      return address
    })
}
