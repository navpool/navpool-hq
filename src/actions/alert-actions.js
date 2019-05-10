import { alertConstants } from '../constants';

export const alertActions = {
  success,
  info,
  warning,
  clear
};

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function info(message) {
  return { type: alertConstants.INFO, message };
}

function warning(message) {
  return { type: alertConstants.WARNING, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}