import {authHeader, handleResponse} from "../helpers";

export const addressService = {
  getAddresses,
  addAddress,
  removeAddress,
}

function getAddresses() {
  return fetch("http://localhost:8085/address", {
    headers: authHeader()
  })
    .then(response => handleResponse(response, true))
    .then(addresses => {
      return addresses;
    })
}

function addAddress(hash, signature) {
  return fetch("http://localhost:8085/address", {
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
  return fetch("http://localhost:8085/address/"+address.id, {
    method: 'DELETE',
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(address => {
      return address
    })
}
