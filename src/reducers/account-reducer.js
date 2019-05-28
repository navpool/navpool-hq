import {accountConstants as constants} from "../constants/account-constants";

const initialState = {
  data: null,
  loaded: false,
  error: null,

  enabledTwoFactor: false,
  twoFactorFulfilled: false,
}

export function account(state = initialState, action) {
  switch (action.type) {
    case constants.GET_ACCOUNT_REQUEST:
      return {
        ...state,
        data: null,
        loaded: false,
        error: null,
      }

    case constants.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.account,
        loaded: true,
        error: null,
      }

    case constants.GET_ACCOUNT_FAILURE:
      return {
        ...initialState,
        data: null,
        loaded: false,
        error: action.error,
      }

    case constants.ACTIVATE_TWOFACTOR:
      return {
        ...state,
        enabledTwoFactor: false,
      }

    case constants.ACTIVATE_TWOFACTOR_SUCCESS:
      state.data.two_factor = {
        ...state.data.two_factor,
        otpauth: action.twoFactor.otpauth,
        secret: action.twoFactor.secret,
      }

      return {
        ...state,
        enabledTwoFactor: true
      }

    case constants.ENABLE_TWOFACTOR_SUCCESS:
      state.data.two_factor = {
        active: true,
      }
      return {
        ...state,
        enabledTwoFactor: true,
        twoFactorFulfilled:  true,
      }

    case constants.ENABLE_TWOFACTOR_FAILURE:
      return {
        ...state,
        enabledTwoFactor: false,
        twoFactorFulfilled:  false,
      }
      
    case constants.DISABLE_TWOFACTOR_SUCCESS:
      state.data.two_factor = {
        active: false,
      }

      return {
        ...state,
        enabledTwoFactor: false,
        twoFactorFulfilled:  true,
      }

    case constants.DISABLE_TWOFACTOR_FAILURE:
      return {
        ...state,
        enabledTwoFactor: true,
        twoFactorFulfilled:  false,
      }

    default:
      return state
  }
}
