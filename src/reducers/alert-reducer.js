import { alertConstants as constants } from '../constants/alert-constants'

export function alert(state = {}, action) {
  switch (action.type) {
    case constants.SUCCESS:
      return {
        type: 'success',
        message: action.message
      }

    case constants.INFO:
      return {
        type: 'info',
        message: action.message
      }

    case constants.WARNING:
      return {
        type: 'warning',
        message: action.message
      }

    case constants.ERROR:
      return {
        type: 'error',
        message: action.message
      }

    case constants.CLEAR:
      return {}

    default:
      return state
  }
}
