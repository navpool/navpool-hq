import React, { Component } from 'react';

import MainLayout from "./components/layout/MainLayout";
import LoginLayout from "./components/layout/LoginLayout";
import {AuthenticationService} from './services/AuthenticationService';

import './assets/scss/app.scss';

class App extends Component {
  render() {
    if (!AuthenticationService.currentUserValue) {
      return (<LoginLayout/>);
    }

    return (<MainLayout/>);
  }
}

export default App;
