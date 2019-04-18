import React, { Component } from 'react';
import {IntlProvider} from "react-intl"
import {Switch, BrowserRouter as Router} from "react-router-dom"
import MainLayout from "./components/layout/MainLayout";
import LoginLayout from "./components/layout/LoginLayout";
import RouteWithLayout from "./components/layout/RouteWithLayout"
import Dashboard from "./views/Dashboard"
import CommunityFundPage from "./views/CommunityFundPage"
import LoginPage from "./views/LoginPage"

import './assets/scss/app.scss';

const locale = "en-US";

class App extends Component {
  render() {
    return (
      <IntlProvider locale={locale}>
        <Router>
          <Switch>
            <RouteWithLayout layout={LoginLayout} path="/login" component={LoginPage}/>
            <RouteWithLayout layout={MainLayout} path="/community-fund" component={CommunityFundPage}/>
            <RouteWithLayout layout={MainLayout} path="/" component={Dashboard}/>
          </Switch>
        </Router>
      </IntlProvider>
    )
  }
}

export default App;
