import { authenticationConstants as constants } from '../constants'
import { authenticationService as service } from '../services'
import { history } from '../helpers'
import {routes} from "../config/routes"
import {alertActions} from "./alert-actions"

export const authenticationActions = {
  registerOpen,
  register,
  login,
  logout,
  refresh,
};

function registerOpen() {
  return { type: constants.REGISTER_OPEN }
}

function register(username, password, passwordConfirm) {
  return dispatch => {
    dispatch(request({ username }))

    service.register(username, password, passwordConfirm)
      .then(
        user => {
          dispatch(success(user))
          dispatch(alertActions.success("Your account has been created. You can now login"))
          history.push(routes.LOGIN.path)
        },
        error => {
          dispatch(failure(error))
        }
      )
  }

  function request(user) { return { type: constants.REGISTER_REQUEST, user } }
  function success(user) { return { type: constants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: constants.REGISTER_FAILURE, error } }
}

function login(username, password, twoFactor) {
  return dispatch => {
    dispatch(request({ username }))

    service.login(username, password, twoFactor)
      .then(
        user => {
          dispatch(success(user))
          history.push(routes.HOMEPAGE.path)
        },
        error => {
          dispatch(failure(error))
        }
      );
  };

  function request(user) { return { type: constants.LOGIN_REQUEST, user } }
  function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
}

function logout() {
  service.logout()
  return { type: constants.LOGOUT }
}

function refresh() {
  return dispatch => {
    dispatch(request())

    service.refresh()
      .then(
        user => {
          dispatch(success(user))
        },
        error => {
          service.logout()
          history.push(routes.LOGIN.path)
          dispatch(alertActions.info("You have been logged out due to inactivity"))
          dispatch(failure(error))
        }
      )
  }

  function request(user) { return { type: constants.REFRESH_REQUEST, user } }
  function success(user) { return { type: constants.REFRESH_SUCCESS, user } }
  function failure(error) { return { type: constants.REFRESH_FAILURE, error } }
}