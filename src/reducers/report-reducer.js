import {reportConstants as constants} from "../constants";

const initialState = {
  network: null,
  staking: null,
  error: null,
  loadingReportNetwork: true,
  errorReportNetwork: false,
  loadingReportStaking: true,
  errorReportStaking: false,
}

export function report(state = initialState, action) {
  switch (action.type) {
    case constants.NETWORK_REPORT_LOAD_REQUEST:
      return {
        ...state,
        loadingReportNetwork: true,
        errorReportNetwork: false
      }

    case constants.NETWORK_REPORT_LOAD_SUCCESS:
      return {
        ...state,
        loadingReportNetwork: false,
        network: action.report,
      }

    case constants.NETWORK_REPORT_LOAD_FAILED:
      return {
        ...state,
        loadingReportNetwork: false,
        errorReportNetwork: action.error
      }

    case constants.STAKING_REPORT_LOAD_REQUEST:
      return {
        ...state,
        loadingReportStaking: true,
        errorReportStaking: false
      }

    case constants.STAKING_REPORT_LOAD_SUCCESS:
      return {
        ...state,
        loadingReportStaking: false,
        staking: action.report,
      }

    case constants.STAKING_REPORT_LOAD_FAILED:
      return {
        ...state,
        loadingReportStaking: false,
        errorReportStaking: action.error
      }

    default:
      return state;
  }
}