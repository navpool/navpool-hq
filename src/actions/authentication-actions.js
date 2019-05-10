import { authenticationConstants as constants } from '../constants';
import { authenticationService as service } from '../services';
import { history } from '../helpers';

export const authenticationActions = {
  login,
  logout,
  refresh,
};

function login(username, password, twoFactor) {
  return dispatch => {
    dispatch(request({ username }));

    service.login(username, password, twoFactor)
      .then(
        user => {
          dispatch(success(user));
          history.push('/');
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request(user) { return { type: constants.LOGIN_REQUEST, user } }
  function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
}

function logout() {
  service.logout();
  return { type: constants.LOGOUT };
}

function refresh() {
  return { type: constants.AUTH_REFRESH };

}