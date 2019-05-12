import { authenticationConstants as constants } from '../constants'
import { authenticationService as service } from "../services";

const initialState = {
  authenticated: service.isLoggedIn(),
  loggingIn: false,
  error: null,
  user: service.isLoggedIn() ? JSON.parse(localStorage.getItem('user')) : null
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      }

    case constants.LOGIN_SUCCESS:
      return {
        user: action.user
      }

    case constants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        error: action.error
      }

    case constants.LOGOUT:
      return {}

    default:
      return state
  }
}
