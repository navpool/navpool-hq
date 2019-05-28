import {addressConstants as constants} from "../constants/address-constants";

const initialState = {
  data: null,
  loaded: false,
  error: null,

  addAddressFulfilled: false,
  removeAddressFulfilled: false,
}

export function address(state = initialState, action) {
  switch (action.type) {
    case constants.GET_ADDRESSES_REQUEST:
      return {
        ...state,
        data: null,
        loaded: false,
        error: null,
      }

    case constants.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        data: action.addresses,
        loaded: true,
        error: null,
      }

    case constants.GET_ADDRESSES_FAILURE:
      return {
        ...state,
        data: null,
        loaded: false,
        error: action.error,
      }

    case constants.ADD_ADDRESS_REQUEST: {
      return {
        ...state,
        addAddressFulfilled: false,
        error: null,
      }
    }

    case constants.ADD_ADDRESS_SUCCESS: {
      state.data.push(action.address);

      return {
        ...state,
        addAddressFulfilled: true,
        error: null,
      }
    }

    case constants.ADD_ADDRESS_FAILURE: {
      return {
        ...state,
        addAddressFulfilled: false,
        error: action.error,
      }
    }

    case constants.REMOVE_ADDRESS_REQUEST: {
      return {
        ...state,
        removeAddressFulfilled: false,
        error: null,
      }
    }

    case constants.REMOVE_ADDRESS_SUCCESS: {
      state.data = state.data.filter((item) => {
        return item.id !== action.address.id;
      });

      return {
        ...state,
        removeAddressFulfilled: true,
      }
    }

    case constants.REMOVE_ADDRESS_FAILURE: {
      return {
        ...state,
        error: action.error,
        removeAddressFulfilled: false,
      }
    }

    default:
      return state
  }
}
