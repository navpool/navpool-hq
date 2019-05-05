import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import {Link} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Grid from '@material-ui/core/Grid'

import AccountPage from '../../views/AccountPage'
import AddressPage from '../../views/AddressPage'
import CommunityFundPage from '../../views/CommunityFundPage'
import Dashboard from '../../views/Dashboard'
import HelpPage from '../../views/HelpPage'
import NetworkStatsPage from '../../views/NetworkStatsPage'
import {AuthenticationService} from '../../services/AuthenticationService'
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  appBar: {
    backgroundColor: '#7d5ab5',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing.unit
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
  icon: {
    color: "#5d3f8d",
  }
});

const routes = [
  {
    name: "Addresses",
    path: "/addresses",
    component: AddressPage,
    icon: <LocationOnIcon />
  },
  {
    name: "Community Fund",
    path: "/community-fund",
    component: CommunityFundPage,
    icon: <PeopleIcon />
  },
  {
    name: "Network Stats",
    path: "/network",
    component: NetworkStatsPage,
    icon: <BarChartIcon />
  },
  {
    name: "Help & Support",
    path: "/help",
    component: HelpPage,
    icon: <HelpIcon />,
  },
  {
    name: "Account",
    path: "/account",
    component: AccountPage,
    icon: <AccountCircleIcon />,
  },
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
    icon: <HomeIcon />
  }
];

class MainLayout extends Component {
  state = {
    authenticated: AuthenticationService.isAuthenticated(),
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  closeDrawer = () => {
    this.setState( ({ mobileOpen: false }));
  };

  handleLogout = () => {
    AuthenticationService.logout()
    this.setState({authenticated: false})
  }

  renderDrawer = (classes) => (
    <div>
      <Hidden xsDown implementation="css">
        <div className={classes.toolbar}/>
      </Hidden>
      <List>
        {[routes[5], routes[0], routes[1], routes[2], routes[3]].map((route, index) => (
          <ListItem button key={index} component={Link} to={route.path} onClick={this.closeDrawer}>
            <div className={classes.icon}>{route.icon}</div>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        <ListItem button component={Link} to={routes[4].path} onClick={this.closeDrawer}>
          <div className={classes.icon}>{routes[4].icon}</div>
          <ListItemText primary={routes[4].name}/>
        </ListItem>
        <ListItem button><div className={classes.icon}><PowerSettingsNewIcon /></div>
          <ListItemText primary="Logout" onClick={this.handleLogout}/>
        </ListItem>
      </List>
    </div>
  )

  render() {
    const {classes, children} = this.props
    const {mobileOpen, authenticated} = this.state
    const renderDrawer = this.renderDrawer(classes)

    if (!authenticated) {
      return (<Redirect to='/login'/>)
    }

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Hidden smUp implementation="css" className={classes.menuButton}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>

            <Grid justify="space-between" container spacing={24}>
              <Grid item>
                <Typography variant="h6" color="inherit" noWrap justifycontent="flex-start">
                  NavPool HQ
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden xsUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{paper: classes.drawerPaper}}
          >
            {renderDrawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
            {renderDrawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          {children}
        </main>
      </div>
    )
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainLayout)
