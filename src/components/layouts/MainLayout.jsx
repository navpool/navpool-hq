import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles/index'
import Drawer from '@material-ui/core/Drawer/index'
import AppBar from '@material-ui/core/AppBar/index'
import {Link} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline/index'
import Toolbar from '@material-ui/core/Toolbar/index'
import List from '@material-ui/core/List/index'
import Typography from '@material-ui/core/Typography/index'
import Divider from '@material-ui/core/Divider/index'
import ListItem from '@material-ui/core/ListItem/index'
import ListItemText from '@material-ui/core/ListItemText/index'
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid/index'
import Hidden from "@material-ui/core/Hidden/index";
import IconButton from "@material-ui/core/IconButton/index";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import {authenticationActions} from "../../actions/authentication-actions";
import {routes} from '../../config/routes';
import {history} from "../../helpers";
import {accountActions, addressActions, alertActions} from "../../actions";
import LoadingAccountDetails from "../account/LoadingAccountDetails";

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#7d5ab5',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolBar: {
    minHeight: "64px !important",
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

class MainLayout extends Component {
  constructor(props) {
    super(props)

    const {dispatch, account, address} = this.props;

    dispatch(authenticationActions.refresh())

    history.listen((location, action) => {
      dispatch(alertActions.clear())
    })

    if (account.data === null) {
      dispatch(accountActions.getAccount())
    }

    if (address.data === null) {
      dispatch(addressActions.getAddresses())
    }
  }

  state = {
    authenticated: true,
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  closeDrawer = () => {
    this.setState( ({ mobileOpen: false }));
  };

  handleLogout = () => {
    const {dispatch, history} = this.props

    dispatch(authenticationActions.logout())
    history.push(routes.LOGIN.path)
  }

  renderDrawer = (classes) => (
    <div>
      <Hidden smDown implementation="css">
        <div className={classes.toolbar}/>
      </Hidden>
      <List>
        <ListItem button component={Link} to={routes.HOMEPAGE.path} onClick={this.closeDrawer}>
          <div className={classes.icon}>{routes.HOMEPAGE.icon}</div>
          <ListItemText primary={routes.HOMEPAGE.name} />
        </ListItem>
        <ListItem button component={Link} to={routes.ADDRESS.path} onClick={this.closeDrawer}>
          <div className={classes.icon}>{routes.ADDRESS.icon}</div>
          <ListItemText primary={routes.ADDRESS.name} />
        </ListItem>
        <ListItem button component={Link} to={routes.COMMUNITY_FUND.path} onClick={this.closeDrawer}>
          <div className={classes.icon}>{routes.COMMUNITY_FUND.icon}</div>
          <ListItemText primary={routes.COMMUNITY_FUND.name} />
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button component={Link} to={routes.ACCOUNT.path} onClick={this.closeDrawer}>
          <div className={classes.icon}>{routes.ACCOUNT.icon}</div>
          <ListItemText primary={routes.ACCOUNT.name} />
        </ListItem>
        <ListItem button><div className={classes.icon}><PowerSettingsNewIcon /></div>
          <ListItemText primary="Logout" onClick={this.handleLogout}/>
        </ListItem>
      </List>
    </div>
  )

  render() {
    const {classes, children, account, address} = this.props
    const {mobileOpen} = this.state
    const renderDrawer = this.renderDrawer(classes)

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Hidden mdUp implementation="css" className={classes.menuButton}>
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
        <Hidden smUp implementation="css">
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
        <Hidden smDown implementation="css">
          <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
            {renderDrawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar}/>

         {!account.loaded || !address.loaded ? <LoadingAccountDetails /> : children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
  account: state.account,
  address: state.address,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(MainLayout)));
