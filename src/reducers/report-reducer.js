import {reportConstants as constants} from "../constants";

const initialState = {
  staking: null,
  error: null,
  loadingReportStaking: true,
  errorReportStaking: false,
}

export function report(state = initialState, action) {
  switch (action.type) {
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