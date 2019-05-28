import {reportService as service} from "../services";
import {reportConstants as constants} from "../constants";

export const reportActions = {
  getStakingReport,
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