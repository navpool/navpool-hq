import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { AuthenticationService } from '../services/AuthenticationService';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import LoginForm from '../components/auth/LoginForm';

const styles = theme => ({
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isFetching: false,
      isError: false,
      didInvalidate: false,
    };
  }

  login({username, password}) {
    this.setState((state) => ({
      isFetching: true,
      isError: state.isError,
      didInvalidate: false,
    }));

    AuthenticationService.login(username, password)
      .then(
        user => {
          this.setState({isAuthenticated: true})
        },
        error => {
          this.setState((state) => ({
            isFetching: false,
            isError: true,
            didInvalidate: true,
          }));
        }
      );
  }

  render() {
    const { isAuthenticated, isFetching, isError } = this.state;
    const { classes } = this.props;

    if (isAuthenticated) {
      return (<Redirect to='/'/>)
    }

    return (
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">Login</Typography>

        <LoginForm handleSubmit={(data) => this.login(data)} isFetching={isFetching} isError={isError} />

        <p>Need an account? <a href="/signup">Sign up</a></p>
      </Paper>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);