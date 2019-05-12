import {cfundProposalService as service} from "../services";
import {alertActions} from "./alert-actions";
import {cfundProposalConstants as constants} from "../constants";

export const cfundProposalActions = {
  getProposals,
  updateProposalVotes,
  submitProposalVotes,
}

function getProposals(includeVotes) {
  return dispatch => {
    dispatch(request());

    service.getProposals()
      .then(
        proposals => {
          dispatch(success(proposals));
          if (includeVotes) {
            dispatch(getProposalVotes(proposals));
          }
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request() { return { type: constants.PROPOSAL_LOAD_REQUEST } }
  function success(proposals) { return { type: constants.PROPOSAL_LOADED_REQUEST, proposals } }
  function failure(error) { return { type: constants.PROPOSAL_FAILED_REQUEST, error } }
}

function getProposalVotes(proposals) {
  return dispatch => {
    dispatch(request());

    service.getProposalVotes()
      .then(
        votes => {
          dispatch(success(getAllVotes(proposals, votes)));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request() { return { type: constants.PROPOSAL_VOTES_LOAD_REQUEST } }
  function success(votes) { return { type: constants.PROPOSAL_VOTES_LOADED_REQUEST, votes } }
  function failure(error) { return { type: constants.PROPOSAL_VOTES_FAILED_REQUEST, error } }
  function getAllVotes(proposals, votes) {
    proposals.forEach((proposal) => {
      if (votes.findIndex(vote => vote.hash === proposal.hash) === -1) {
        votes.push({
          type:'PROPOSAL',
          hash: proposal.hash,
          vote:null
        })
      }
    })

    return votes;
  }
}

function updateProposalVotes(votes) {
  return {
    type: constants.UPDATE_PROPOSAL_VOTES_SUBMIT,
    votes: votes
  };
}

function submitProposalVotes(votes) {
  return dispatch => {
    dispatch(request());

    service.submitProposalVotes(votes)
      .then(
        votes => {
          dispatch(success(votes));
          dispatch(alertActions.info("Your proposal votes have been updated"));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request() { return { type: constants.UPDATE_PROPOSAL_VOTES_REQUEST } }
  function success(votes) { return { type: constants.UPDATE_PROPOSAL_VOTES_SUCCESS, votes } }
  function failure(error) { return { type: constants.UPDATE_PROPOSAL_VOTES_FAILURE, error } }
}
