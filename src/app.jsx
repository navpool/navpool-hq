import React, {Component} from 'react';
import {Switch, Router} from 'react-router-dom';
import {IntlProvider} from "react-intl"

import {history, store} from './helpers'
import LoginLayout from "./components/layouts/LoginLayout"
import MainLayout from "./components/layouts/MainLayout"
import {RouteWithLayout} from "./components/RouteWithLayout"

import Dashboard from './components/Dashboard'
import Account from './components/account/Account'
import Address from './components/address/Addresses'
import AddressAdd from "./components/address-add/AddressAdd";
import AddressRemove from "./components/address-remove/AddressRemove";
import Login from './components/authentication/Login'

import './assets/scss/app.scss';
import {Provider} from "react-redux";
import AccountSecurity from "./components/account-security/AccountSecurity";
import CommunityFund from "./components/community-fund/CommunityFund";

export class App extends Component {
  render() {
    const locale = "en-US";

    return (
      <Provider store={store}>
        <IntlProvider locale={locale}>
          <Router history={history}>
            <Switch>
              <RouteWithLayout layout={LoginLayout} path="/login" component={Login}/>
              <RouteWithLayout layout={MainLayout} path="/community-fund" secure component={CommunityFund}/>
              <RouteWithLayout layout={MainLayout} path="/addresses/add" secure component={AddressAdd}/>
              <RouteWithLayout layout={MainLayout} path="/addresses/remove" secure component={AddressRemove}/>
              <RouteWithLayout layout={MainLayout} path="/addresses" secure component={Address}/>
              <RouteWithLayout layout={MainLayout} path="/account/security" secure component={AccountSecurity}/>
              <RouteWithLayout layout={MainLayout} path="/account" secure component={Account}/>
              <RouteWithLayout layout={MainLayout} path="/" secure component={Dashboard}/>
            </Switch>
          </Router>
        </IntlProvider>
      </Provider>
    )
  }
}
