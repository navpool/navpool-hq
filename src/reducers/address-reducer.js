import {addressConstants as constants} from "../constants/address-constants";

const initialState = {
  addresses: [],

  loading: false,
  error: null,

  addAddressFulfilled: null,

  removeAddress: null,
}

export function address(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_ADDRESSES:
      return {
        ...state,
        loading: true
      }
    case constants.LOADED_ADDRESSES:
      return {
        ...state,
        loading: false,
        addresses: action.addresses,
      }

    case constants.ADD_ADDRESS_OPEN: {
      return {
        ...state,
        error: null,
        addAddressFulfilled: null,
      }
    }

    case constants.ADD_ADDRESS_SUCCESS: {
      return {
        ...state,
        addAddressFulfilled:  true,
      }
    }

    case constants.ADD_ADDRESS_FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case constants.REMOVE_ADDRESS_OPEN: {
      return {
        ...state,
        removeAddress: action.key,
        removeAddressFulfilled: false,
      }
    }

    case constants.REMOVE_ADDRESS_SUCCESS: {
      return {
        ...state,
        removeAddressFulfilled:  true,
      }
    }

    case constants.REMOVE_ADDRESS_FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
