import React from 'react';
import PropTypes from 'prop-types';
import {IntlProvider} from "react-intl"
import {Switch, Route, BrowserRouter as Router} from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid'

import CommunityFund from '../views/CommunityFund'
import Dashboard from '../views/Dashboard'
import Help from '../views/Help'
import NetworkStats from '../views/NetworkStats'
import Report from '../views/Report'
import Account from '../views/Account'
import Logout from '../views/Logout'

const routes = [
  {
    name: "Staking Report",
    path: "/report",
    component: Report,
  },
  {
    name: "Community Fund",
    path: "/community-fund",
    component: CommunityFund,
  },
  {
    name: "Network Stats",
    path: "/stats",
    component: NetworkStats,
  },
  {
    name: "Help & Support",
    path: "/help",
    component: Help,
  },
  {
    name: "My Account",
    path: "/account",
    component: Account,
  },
  {
    name: "Logout",
    path: "/logout",
    component: Logout,
  },
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard
  }
];

export default class MainLayout extends Component {
  render() {
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Grid justify="space-between" container spacing={24}>
                <Grid item>
                  <Typography variant="h6" color="inherit" noWrap justifycontent="flex-start">
                    NavPool HQ
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
            <div className={classes.toolbar} />
            <List>
              {[routes[6],routes[0],routes[1],routes[2],routes[3]].map((route, index) => (
                <ListItem button key={index} component="a" href={route.path}>
                  <ListItemText primary={route.name} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {[routes[4], routes[5]].map((route, index) => (
                <ListItem button key={index} component="a" href={route.path}>
                  <ListItemText primary={route.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
              ))}
            </Switch>
          </main>
        </div>
      </Router>
    </IntlProvider>
  );
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);