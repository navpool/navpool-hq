import {cfundPaymentRequestConstants as constants} from "../constants";

const initialState = {
  paymentRequests: {},
  votes: [],

  paymentRequestsLoaded: false,
  paymentRequestVotesLoaded: false,
  paymentRequestVotesSubmitting: false,
}

export function cfundPaymentRequest(state = initialState, action) {
  switch (action.type) {
    case constants.PAYMENT_REQUEST_LOAD_REQUEST:
      return {
        ...state,
        error: null,
        paymentRequestsLoaded: false,
      }

    case constants.PAYMENT_REQUEST_LOADED_REQUEST:
      return {
        ...state,
        paymentRequestsLoaded: true,
        paymentRequests: action.paymentRequests,
      }


    case constants.PAYMENT_REQUEST_VOTES_LOAD_REQUEST:
      return {
        ...state,
        error: null,
        paymentRequestVotesLoaded: false,
      }

    case constants.PAYMENT_REQUEST_VOTES_LOADED_REQUEST:
      return {
        ...state,
        paymentRequestVotesLoaded: true,
        votes: action.votes,
      }

    case constants.PAYMENT_REQUEST_VOTES_FAILED_REQUEST:
      return {
        ...state,
        paymentRequestVotesLoaded: false,
      }

    case constants.UPDATE_PAYMENT_REQUEST_VOTES_SUBMIT:
      return {
        ...state,
        votes: action.votes
      }

    case constants.UPDATE_PAYMENT_REQUEST_VOTES_REQUEST:
      return {
        ...state,
        paymentRequestVotesSubmitting: true,
      }

    case constants.UPDATE_PAYMENT_REQUEST_VOTES_SUCCESS:

      return {
        ...state,
        paymentRequestVotesSubmitting: false,
        votes: merge(state.votes, action.votes),
      }

    case constants.UPDATE_PAYMENT_REQUEST_VOTES_FAILURE:
      return {
        ...state,
        paymentRequestVotesSubmitting: false,
      }

    default:
      return state;
  }
}


function merge(a, b){
  let reduced =  a.filter( aitem => ! b.find ( bitem => aitem.hash === bitem.hash) )

  return reduced.concat(b);
}