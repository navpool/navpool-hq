import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handle-response';
let jwt = require('jsonwebtoken');


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const AuthenticationService = {
  login,
  logout,
  isAuthenticated,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
  let bodyFormData = new FormData();
  bodyFormData.set("username", username);
  bodyFormData.set("password", password);

  const requestOptions = {
    method: 'POST',
    body: bodyFormData,
  };

  const url = "http://localhost:8085"; //process.env.NAVPOOL_API_URL

  return fetch(url + '/auth/login', requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}

function isAuthenticated() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser == null) {
    return false;
  }

  let decodedToken = jwt.decode(currentUser.token);

  return decodedToken.exp > (Date.now()/1000);
}