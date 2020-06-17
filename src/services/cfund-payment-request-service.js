import {authHeader, handleResponse} from "../helpers";

export const cfundPaymentRequestService = {
  getPaymentRequests,
  getPaymentRequestVotes,
  submitPaymentRequestVotes,
}

const apiUrl = process.env.REACT_APP_API_URL
const explorerUrl = process.env.REACT_APP_EXPLORER_URL

function getPaymentRequests() {
  return fetch(explorerUrl+"/dao/cfund/payment-request?state=0", {})
    .then((response) => handleResponse(response, true))
    .then(paymentRequests => {
      return paymentRequests;
    })
}

function getPaymentRequestVotes() {
  return fetch(apiUrl+"/community-fund/payment-request/vote", {
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(votes => {
      return votes;
    })
}

function submitPaymentRequestVotes(votes) {
  return fetch(apiUrl+"/community-fund/payment-request/vote", {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(votes.filter((vote) => vote.dirty === true))
  })
    .then((response) => handleResponse(response, true))
    .then((votes) => {
      return votes;
    })
}