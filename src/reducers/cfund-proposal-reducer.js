import {cfundProposalConstants as constants} from "../constants";

const initialState = {
  proposals: {},
  votes: [],

  proposalsLoaded: false,
  proposalVotesLoaded: false,
  proposalVotesSubmitting: false,
}

export function cfundProposal(state = initialState, action) {
  switch (action.type) {
    case constants.PROPOSAL_LOAD_REQUEST:
      return {
        ...state,
        error: null,
        proposalsLoaded: false,
      }

    case constants.PROPOSAL_LOADED_REQUEST:
      return {
        ...state,
        proposalsLoaded: true,
        proposals: action.proposals,
      }


    case constants.PROPOSAL_VOTES_LOAD_REQUEST:
      return {
        ...state,
        error: null,
        proposalVotesLoaded: false,
      }

    case constants.PROPOSAL_VOTES_LOADED_REQUEST:
      return {
        ...state,
        proposalVotesLoaded: true,
        votes: action.votes,
      }

    case constants.PROPOSAL_VOTES_FAILED_REQUEST:
      return {
        ...state,
        proposalVotesLoaded: false,
      }

    case constants.UPDATE_PROPOSAL_VOTES_SUBMIT:
      return {
        ...state,
        votes: action.votes
      }

    case constants.UPDATE_PROPOSAL_VOTES_REQUEST:
      return {
        ...state,
        proposalVotesSubmitting: true,
      }

    case constants.UPDATE_PROPOSAL_VOTES_SUCCESS:

      return {
        ...state,
        proposalVotesSubmitting: false,
        votes: merge(state.votes, action.votes),
      }

    case constants.UPDATE_PROPOSAL_VOTES_FAILURE:
      return {
        ...state,
        proposalVotesSubmitting: false,
      }

    default:
      return state;
  }
}


function merge(a, b){
  let reduced =  a.filter( aitem => ! b.find ( bitem => aitem.hash === bitem.hash) )

  return reduced.concat(b);
}