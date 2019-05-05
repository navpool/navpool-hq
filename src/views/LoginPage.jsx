import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { AuthenticationService } from '../services/AuthenticationService'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import FavoriteIcon from '@material-ui/icons/Favorite';

import LoginForm from '../components/auth/LoginForm'

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
    width: '60%',
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

class LoginPage extends Component {
  state = {
    isAuthenticated: false,
    isFetching: false,
    isError: false,
    didInvalidate: false,
    isMobile: false,
  }

  login({username, password, twoFactor}) {
    this.setState({
      isFetching: true,
      didInvalidate: false,
    });

    AuthenticationService.login(username, password, twoFactor)
      .then(() => {
        this.setState({isAuthenticated: true})
      })
      .catch(() => {
        this.setState({
          isFetching: false,
          isError: true,
          didInvalidate: true,
        })
      })
  }

  componentDidMount() {
    this.detectMobile();

    window.addEventListener('resize', () => {
      this.detectMobile()
    }, false);
  }

  detectMobile() {
    this.setState({
      isMobile: window.innerWidth < 650
    });
  }

  render() {
    const { isMobile, isAuthenticated, isFetching, isError } = this.state
    const { classes } = this.props


    console.log(this.state.isMobile)
    if (isAuthenticated) {
      return (<Redirect to='/'/>)
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Paper className={isMobile ? classes.paperMobile : classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">NavPool HQ</Typography>

            <LoginForm handleSubmit={(data) => this.login(data)} isFetching={isFetching} isError={isError} />

            {/*<p>Need an account? <a href="/signup">Sign up</a></p>*/}
          </Paper>
          <p className={classes.love}>Made with <FavoriteIcon className={classes.favorite} /> by the Nav community</p>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginPage)
