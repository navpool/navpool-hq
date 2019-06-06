import { alertConstants } from '../constants';

export const alertActions = {
  success,
  info,
  warning,
  error,
  clear,
};

function success(message) {
  return {
    type: alertConstants.SUCCESS,
    message: getMessage(message)
  };
}

function info(message) {
  return {
    type: alertConstants.INFO,
    message: getMessage(message)
  };
}

function warning(message) {
  return {
    type: alertConstants.WARNING,
    message: getMessage(message)
  };
}

function error(message) {
  return {
    type: alertConstants.ERROR,
    message: getMessage(message)
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