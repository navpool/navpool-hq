import {addressConstants as constants} from '../constants';
import {addressService as service} from "../services";
import {alertActions} from "./alert-actions";

export const addressActions = {
  getAddresses,
  addAddress,
  removeAddress
};

function getAddresses() {
  return dispatch => {
    dispatch(request());

    service.getAddresses()
      .then(
        addresses => {
          dispatch(success(addresses));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request() {return {type: constants.GET_ADDRESSES_REQUEST}}
  function success(addresses) {return {type: constants.GET_ADDRESSES_SUCCESS, addresses}}
  function failure(error) {return {type: constants.GET_ADDRESSES_FAILURE, error}}
}

function addAddress(hash, signature) {
  return dispatch => {
    dispatch(request({ hash }));

    service.addAddress(hash, signature)
      .then(
        address => {
          dispatch(success(address))
          dispatch(alertActions.info('The `'+address.spending_address+'` address has been added to your account'));
        },
        error => {
          dispatch(failure(error));
        }
      );
  }

  function request(hash) { return { type: constants.ADD_ADDRESS_REQUEST, hash } }
  function success(address) { return { type: constants.ADD_ADDRESS_SUCCESS, address } }
  function failure(error) { return { type: constants.ADD_ADDRESS_FAILURE, error } }
}

function removeAddress(address) {
  return dispatch => {
    dispatch(request({address}));

    service.removeAddress(address.id)
      .then(
        () => {
          dispatch(success(address));
          dispatch(alertActions.info('The `'+address.spending_address+'` address has been removed to your account'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  }

  function request(address) { return { type: constants.REMOVE_ADDRESS_REQUEST, address } }
  function success(address) { return { type: constants.REMOVE_ADDRESS_SUCCESS, address } }
  function failure(error) { return { type: constants.REMOVE_ADDRESS_FAILURE, error } }
}