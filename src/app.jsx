import React, {Component} from 'react';
import {Switch, Router} from 'react-router-dom';
import {IntlProvider} from "react-intl"

import {history, store} from './helpers'
import MainLayout from "./components/layouts/MainLayout"
import {RouteWithLayout} from "./components/RouteWithLayout"

import './assets/scss/app.scss';
import {Provider} from "react-redux";
import {routes as routeConfig} from "./config/routes";

export class App extends Component {
  render() {
    const locale = "en-US";

    const routes = Object.keys(routeConfig).reverse().map(key => (
      <RouteWithLayout
        key={key}
        layout={routeConfig[key].layout ? routeConfig[key].layout : MainLayout}
        path={routeConfig[key].path}
        component={routeConfig[key].component}
        secure={routeConfig[key].secure}
      />
    ))

    return (
      <Provider store={store}>
        <IntlProvider locale={locale}>
          <Router history={history}>
            <Switch>{routes}</Switch>
          </Router>
        </IntlProvider>
      </Provider>
    )
  }
}
