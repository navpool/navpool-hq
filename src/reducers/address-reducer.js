import {addressConstants as constants} from "../constants/address-constants";

const initialState = {
  addresses: [],

  loading: true,
  error: null,

  addAddressFulfilled: null,

  removeAddress: null,
}

export function address(state = initialState, action) {
  switch (action.type) {
    case constants.ADDRESSES_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        failure: false,
      }

    case constants.ADDRESSES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        failure: false,
        addresses: action.addresses,
      }

    case constants.ADDRESSES_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        failure: true,
        addresses: [],
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

    // REMOVE ADDRESS
    case constants.REMOVE_ADDRESS_LOAD_REQUEST:
      return {
        ...state,
        removeAddressFulfilled: false,
        loading: true,
        failure: false,
      }

    case constants.REMOVE_ADDRESS_LOAD_SUCCESS:
      return {
        ...state,
        removeAddress: action.address,
        loading: false,
        failure: false,
      }

    case constants.REMOVE_ADDRESS_LOAD_FAILURE:
      return {
        ...state,
        removeAddress: null,
        loading: false,
        failure: true,
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
        removeAddress: null,
        error: action.error,
        loading: false,
        failure: true,
        removeAddressFulfilled: false,
      }
    }

    default:
      return state
  }
}
