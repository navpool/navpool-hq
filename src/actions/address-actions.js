import {addressConstants as constants} from '../constants';
import {addressService as service} from "../services";
import {alertActions} from "./alert-actions";

export const addressActions = {
  getAddresses,
  addAddress,
  removeAddressOpen,
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
          dispatch(alertActions.warning(error));
        }
      )
  }

  function request() {return {type: constants.LOAD_ADDRESSES}}
  function success(addresses) {return {type: constants.LOADED_ADDRESSES, addresses}}
  function failure(error) {return {type: constants.FAILED_ADDRESSES, error}}
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

function removeAddressOpen(key) {
  return { type: constants.REMOVE_ADDRESS_OPEN, key }
}

function removeAddress(address) {
  return dispatch => {
    const selectedAddress = address.addresses[address.removeAddress]

    dispatch(request({selectedAddress}));

    service.removeAddress(selectedAddress)
      .then(
        () => {
          dispatch(success(selectedAddress));
          dispatch(alertActions.info('The `'+selectedAddress.spending_address+'` address has been removed to your account'));
        },
        error => {
          dispatch(failure(error));
        }
      );
  }

  function request(selectedAddress) { return { type: constants.REMOVE_ADDRESS_REQUEST, selectedAddress } }
  function success(selectedAddress) { return { type: constants.REMOVE_ADDRESS_SUCCESS, selectedAddress } }
  function failure(error) { return { type: constants.REMOVE_ADDRESS_FAILURE, error } }
}