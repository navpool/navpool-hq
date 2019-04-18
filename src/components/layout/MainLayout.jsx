import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom"

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

import CommunityFundPage from '../../views/CommunityFundPage'
import Dashboard from '../../views/Dashboard'
import Help from '../../views/Help'
import NetworkStats from '../../views/NetworkStats'
import Report from '../../views/Report'
import Account from '../../views/Account'
import { AuthenticationService } from '../../services/AuthenticationService';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor:'#4d3474',
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const routes = [
  {
    name: "Staking Report",
    path: "/report",
    component: Report,
  },
  {
    name: "Community Fund",
    path: "/community-fund",
    component: CommunityFundPage,
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
    name: "Dashboard",
    path: "/",
    component: Dashboard
  }
];

class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: AuthenticationService.isAuthenticated(),
    };

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    AuthenticationService.logout();
    this.setState({authenticated: false});
  }

  render() {
    const { classes, children } = this.props;
    const { authenticated } = this.state;

    if (!authenticated) {
      return (<Redirect to='/login'/>)
    }

    return (
      <div className={classes.root}>
        <CssBaseline/>
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
        <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
          <div className={classes.toolbar}/>
          <List>
            {[routes[5], routes[0], routes[1], routes[2], routes[3]].map((route, index) => (
              <ListItem button key={index} component="a" href={route.path}>
                <ListItemText primary={route.name}/>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            <ListItem button component="a" href={routes[4].path}>
              <ListItemText primary={routes[4].name}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Logout" onClick={this.handleLogout}/>
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          {children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);