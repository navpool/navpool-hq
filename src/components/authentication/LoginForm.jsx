import React, { Component } from 'react'
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles"
import Button from '@material-ui/core/Button/index'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import CircularProgress from '@material-ui/core/CircularProgress/index'
import SnackbarContent from '@material-ui/core/SnackbarContent/index'

import {authenticationActions} from "../../actions";
import Actions from "../Actions";

const styles = theme => ({
  snackbar: {
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.error.dark,
  },
  purple: {
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    twoFactor: '',
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({ [field]: value })
  };

  handleSubmit = () => {
    const {username, password, twoFactor} = this.state;

    this.props.dispatch(authenticationActions.login(username, password, twoFactor))
  }

  render() {
    const { username, password, twoFactor } = this.state;
    const { classes, authentication } = this.props;

    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        { authentication.error && <SnackbarContent className={classes.snackbar} message="Username, password or 2FA incorrect" /> }

        <TextValidator
          fullWidth
          label="Username"
          onChange={this.handleChange}
          name="username"
          autoComplete={"off"}
          value={username}
          validators={['required']}
          errorMessages={['this field is required']}
          margin="normal"
        />
        <TextValidator
          fullWidth
          label="Password"
          type='password'
          onChange={this.handleChange}
          name="password"
          autoComplete={"off"}
          value={password}
          validators={['required']}
          errorMessages={['this field is required']}
          margin="normal"
        />

        <TextValidator
          fullWidth
          label="Two factor authentication"
          onChange={this.handleChange}
          name="twoFactor"
          autoComplete={"off"}
          value={twoFactor}
          margin="normal"
        />

        <Actions>
          <Button variant="contained"
                  fullWidth
                  color="primary"
                  type="submit"
                  disabled={authentication.loggingIn}
                  margin="normal"
                  className={classes.purple}
          >
            {authentication.loggingIn && <CircularProgress size={20} />} Login
          </Button>
        </Actions>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginForm))