import {authHeader, handleResponse} from "../helpers";

export const reportService = {
  getStakingReport,
}

const apiUrl = process.env.REACT_APP_API_URL

function getStakingReport() {
  return fetch(apiUrl+"/staking/rewards", {
    headers: authHeader()
  })
    .then((response) => handleResponse(response, true))
    .then(report => {
      return report;
    })
}