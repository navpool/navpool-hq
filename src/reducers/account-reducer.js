import {accountConstants as constants} from "../constants/account-constants";

const initialState = {
  loading: true,
  account: {},
  enabledTwoFactor: false,
  twoFactorFulfilled: false,
}

export function account(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_ACCOUNT:
      return {
        ...state,
        error: null,
        loading: true,
        twoFactorFulfilled:  false,
      }

    case constants.LOADED_ACCOUNT:
      return {
        ...state,
        loading: false,
        account: action.account,
      }

    case constants.ACTIVATE_TWOFACTOR:
      return {
        ...state,
        enabledTwoFactor: false,
      }

    case constants.ACTIVATE_TWOFACTOR_SUCCESS:
      state.account.two_factor = {
        ...state.account.two_factor,
        otpauth: action.twoFactor.otpauth,
        secret: action.twoFactor.secret,
      }

      return {
        ...state,
        enabledTwoFactor: true
      }

    case constants.ENABLE_TWOFACTOR: {
      return {
        ...state,
        error: null,
      }
    }

    case constants.ENABLE_TWOFACTOR_SUCCESS:
      state.account.two_factor.active = true
      state.account.two_factor.secret = null
      state.account.two_factor.otpauth = null

      return {
        ...state,
        twoFactorFulfilled:  true,
      }

    case constants.ENABLE_TWOFACTOR_FAILURE:
      return {
        ...state,
        enabledTwoFactor: false,
        twoFactorFulfilled:  false,
        error: action.error
      }

    case constants.DISABLE_TWOFACTOR: {
      return {
        ...state,
        error: null,
      }
    }

    case constants.DISABLE_TWOFACTOR_SUCCESS:
      state.account.two_factor.active = false

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
        error: action.error
      }

    default:
      return state
  }
}
