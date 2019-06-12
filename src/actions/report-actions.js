import {reportService as service} from "../services";
import {reportConstants as constants} from "../constants";

export const reportActions = {
  getNetworkReport,
  getStakingReport,
}

function getNetworkReport() {
  return dispatch => {
    dispatch(request());

    service.getNetworkReport()
      .then(
        report => {
          dispatch(success(report));
        },
        error => {
          dispatch(failure(error));
        }
      )
  }

  function request() { return { type: constants.NETWORK_REPORT_LOAD_REQUEST } }
  function success(report) { return { type: constants.NETWORK_REPORT_LOAD_SUCCESS, report } }
  function failure(error) { return { type: constants.NETWORK_REPORT_LOAD_FAILED, error } }
}

function getStakingReport() {
  return dispatch => {
    dispatch(request());

    service.getStakingReport()
      .then(
        report => {
          dispatch(success(report));
        },
        error => {
          dispatch(failure(error));
        }
      )
  }

  function request() { return { type: constants.STAKING_REPORT_LOAD_REQUEST } }
  function success(report) { return { type: constants.STAKING_REPORT_LOAD_SUCCESS, report } }
  function failure(error) { return { type: constants.STAKING_REPORT_LOAD_FAILED, error } }
}