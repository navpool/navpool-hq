import React from 'react'
import { connect } from 'react-redux'
import {isMobileOnly} from 'react-device-detect';

import withStyles from '@material-ui/core/styles/withStyles'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Paper from "@material-ui/core/Paper/index";
import Avatar from "@material-ui/core/Avatar/index";
import Typography from "@material-ui/core/Typography/index";

import LoginForm from "./LoginForm";
import {authenticationActions as actions } from '../../actions'
import {authenticationService as service} from "../../services";

const styles = theme => ({
  root: {
    height: "100%",
    width: "100%",
    background: "url(/login-bg.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  container: {
    position: "absolute",
    top: "30%",
    width: "100%",
    transform: "translateY(-30%)",
  },
  paper: {
    width: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    marginTop: theme.spacing.unit * 8,
  },
  paperMobile: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit }px ${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 1.5}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "#7d5ab5",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  love: {
    paddingTop: theme.spacing.unit,
    textAlign: "center",
    color: "#ffffff",
  },
  favorite: {
    color: "#f50057",
    verticalAlign: "middle",
  }
})

class Login extends React.Component {
  constructor(props) {
    super(props)

    if (service.isLoggedIn()) {
      this.props.dispatch(actions.logout())
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Paper className={isMobileOnly ? classes.paperMobile : classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">NavPool HQ</Typography>

            <LoginForm />

            {/*<p>Need an account? <a href="/signup">Sign up</a></p>*/}
          </Paper>
          <p className={classes.love}>Made with <FavoriteIcon className={classes.favorite} /> by the Nav community</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(withStyles(styles)(Login))
