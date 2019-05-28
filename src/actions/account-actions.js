import {accountService as service} from "../services"
import {alertActions} from "./alert-actions"
import {accountConstants as constants} from "../constants"

export const accountActions = {
  getAccount,
  changePassword,
  activateTwoFactor,
  enableTwoFactor,
  disableTwoFactor,
}

function getAccount() {
  return dispatch => {
    dispatch(request())

    service.getAccount()
      .then(
        account => {
          dispatch(success(account))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.warning(error))
        }
      )
  }

  function request() { return { type: constants.GET_ACCOUNT_REQUEST } }
  function success(account) { return { type: constants.GET_ACCOUNT_SUCCESS, account } }
  function failure(error) { return { type: constants.GET_ACCOUNT_FAILURE, error } }
}

function changePassword(currentPassword, newPassword, confirmPassword) {
  return dispatch => {
    dispatch(request());

    service.changePassword(currentPassword, newPassword, confirmPassword)
      .then(
        () => {
          dispatch(success())
        },
        error => {
          dispatch(failure(error))
        }
      )
  }

  function request() { return { type: constants.CHANGE_PASSWORD } }
  function success() { return { type: constants.CHANGE_PASSWORD_SUCCESS } }
  function failure(error) { return { type: constants.CHANGE_PASSWORD_FAILURE, error } }
}

function activateTwoFactor() {
  return dispatch => {
    dispatch(request());

    service.activateTwoFactor()
      .then(
        (twoFactor) => {
          dispatch(success(twoFactor))
        },
        error => {
          dispatch(failure(error))
        }
      )
  }

  function request() { return { type: constants.ACTIVATE_TWOFACTOR } }
  function success(twoFactor) { return { type: constants.ACTIVATE_TWOFACTOR_SUCCESS, twoFactor } }
  function failure(error) { return { type: constants.ACTIVATE_TWOFACTOR_FAILURE, error } }
}

function enableTwoFactor(verificationCode) {
  return dispatch => {
    dispatch(request());

    service.enableTwoFactor(verificationCode)
      .then(
        () => {
          dispatch(success())
          dispatch(alertActions.info('Two factor authentication has been enabled on your account'))
        },
        error => {
          dispatch(alertActions.error(error))
          dispatch(failure())
        }
      )
  }

  function request() { return { type: constants.ENABLE_TWOFACTOR } }
  function success() { return { type: constants.ENABLE_TWOFACTOR_SUCCESS } }
  function failure(error) { return { type: constants.ENABLE_TWOFACTOR_FAILURE, error } }
}

function disableTwoFactor(verificationCode) {
  return dispatch => {
    dispatch(request())

    service.disableTwoFactor(verificationCode)
      .then(
        () => {
          dispatch(success())
          dispatch(alertActions.info('Two factor authentication has been disabled on your account'))
        },
        error => {
          dispatch(alertActions.error(error))
          dispatch(failure())
        }
      )
  }

  function request() { return { type: constants.DISABLE_TWOFACTOR } }
  function success() { return { type: constants.DISABLE_TWOFACTOR_SUCCESS } }
  function failure(error) { return { type: constants.DISABLE_TWOFACTOR_FAILURE, error } }
}
