import { alertConstants } from '../constants';

export const alertActions = {
  success,
  info,
  warning,
  error,
  clear,
};

function success(error) {
  return {
    type: alertConstants.SUCCESS,
    message: getMessage(error)
  };
}

function info(error) {
  return {
    type: alertConstants.INFO,
    message: getMessage(error)
  };
}

function warning(error) {
  return {
    type: alertConstants.WARNING,
    message: getMessage(error)
  };
}

function error(error) {
  return {
    type: alertConstants.ERROR,
    message: getMessage(error)
  };
}

function clear() {
  return {
    type: alertConstants.CLEAR
  };
}

function getMessage(error) {
  if (typeof error === 'string') {
    return error
  }

  if (typeof error.error === 'string') {
    return error.error
  }

  return "An unknown error has occurred"

}