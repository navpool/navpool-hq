import React, { Component } from 'react';

import MainLayout from "./components/layout/MainLayout";
import LoginLayout from "./components/layout/LoginLayout";
import {AuthenticationService} from './services/AuthenticationService';

import './assets/scss/app.scss';

class App extends Component {
  state = {
    currentUser: null
  };

  componentDidMount() {
    AuthenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {!currentUser && <LoginLayout /> }
        {currentUser && <MainLayout /> }
      </div>
    )
  }
}

export default App;
