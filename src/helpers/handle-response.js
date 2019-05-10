import {authenticationService} from "../services";

export function handleResponse(response, secure) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      if (secure && response.status === 401) {
        authenticationService.logout()
        window.location.reload()
      }

      return Promise.reject(data || response.statusText)
    }

    return data;
  })
}