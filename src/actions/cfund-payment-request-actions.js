import {cfundPaymentRequestService as service} from "../services";
import {alertActions} from "./alert-actions";
import {cfundPaymentRequestConstants as constants} from "../constants";

export const cfundPaymentRequestActions = {
  getPaymentRequests,
  updatePaymentRequestVotes,
  submitPaymentRequestVotes,
}

function getPaymentRequests(includeVotes) {
  return dispatch => {
    dispatch(request());

    service.getPaymentRequests()
      .then(
        paymentRequests => {
          dispatch(success(paymentRequests));
          if (includeVotes) {
            dispatch(getPaymentRequestVotes(paymentRequests));
          }
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request() { return { type: constants.PAYMENT_REQUEST_LOAD_REQUEST } }
  function success(paymentRequests) { return { type: constants.PAYMENT_REQUEST_LOADED_REQUEST, paymentRequests } }
  function failure(error) { return { type: constants.PAYMENT_REQUEST_FAILED_REQUEST, error } }
}

function getPaymentRequestVotes(paymentRequests) {
  return dispatch => {
    dispatch(request());

    service.getPaymentRequestVotes()
      .then(
        votes => {
          dispatch(success(getAllVotes(paymentRequests, votes)));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request() { return { type: constants.PAYMENT_REQUEST_VOTES_LOAD_REQUEST } }
  function success(votes) { return { type: constants.PAYMENT_REQUEST_VOTES_LOADED_REQUEST, votes } }
  function failure(error) { return { type: constants.PAYMENT_REQUEST_VOTES_FAILED_REQUEST, error } }
  function getAllVotes(paymentRequests, votes) {
    if (votes === "") {
      votes = []
    }
    paymentRequests.forEach((paymentRequest) => {
      if (votes && votes.findIndex(vote => vote.hash === paymentRequest.hash) === -1) {
        votes.push({
          type:'PROPOSAL',
          hash: paymentRequest.hash,
          vote: null
        })
      }
    })

    return votes;
  }
}

function updatePaymentRequestVotes(votes) {
  return {
    type: constants.UPDATE_PAYMENT_REQUEST_VOTES_SUBMIT,
    votes: votes
  };
}

function submitPaymentRequestVotes(votes) {
  return dispatch => {
    dispatch(request());

    service.submitPaymentRequestVotes(votes)
      .then(
        votes => {
          console.log(votes);
          dispatch(success(votes));
          dispatch(alertActions.info("Your payment request votes have been updated"));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request() { return { type: constants.UPDATE_PAYMENT_REQUEST_VOTES_REQUEST } }
  function success(votes) { return { type: constants.UPDATE_PAYMENT_REQUEST_VOTES_SUCCESS, votes } }
  function failure(error) { return { type: constants.UPDATE_PAYMENT_REQUEST_VOTES_FAILURE, error } }
}
