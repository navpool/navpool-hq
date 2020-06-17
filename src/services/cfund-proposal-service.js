import {authHeader, handleResponse} from "../helpers";

export const cfundProposalService = {
  getProposals,
  getProposalVotes,
  submitProposalVotes,
}

const apiUrl = process.env.REACT_APP_API_URL
const explorerUrl = process.env.REACT_APP_EXPLORER_URL

function getProposals() {
  return fetch(explorerUrl+"/dao/cfund/proposal?state=0", {})
    .then((response) => handleResponse(response, true))
    .then(proposals => {
      return proposals;
    })
}

function getProposalVotes() {
  return fetch(apiUrl+"/community-fund/proposal/vote", {
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(votes => {
      return votes;
    })
}

function submitProposalVotes(votes) {
  return fetch(apiUrl+"/community-fund/proposal/vote", {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(votes.filter((vote) => vote.dirty === true))
  })
    .then((response) => handleResponse(response, true))
    .then((votes) => {
      return votes;
    })
}