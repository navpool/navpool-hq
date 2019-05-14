import React, { Component } from 'react'
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles"
import Button from '@material-ui/core/Button/index'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import CircularProgress from '@material-ui/core/CircularProgress/index'

import {authenticationActions as actions} from "../../actions";
import Actions from "../Actions";
import StatusBar from "../StatusBar";

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

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
  }

  componentDidMount() {
    this.props.dispatch(actions.registerOpen())

    this.setState({
      username: '',
      password: '',
      passwordConfirm: '',
    })
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({ [field]: value })
  };

  handleSubmit = () => {
    const {username, password, passwordConfirm} = this.state;

    this.props.dispatch(actions.register(username, password, passwordConfirm))
  }

  render() {
    const { username, password, passwordConfirm } = this.state;
    const { classes, authentication } = this.props;

    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        { authentication.error && <StatusBar variant="error" text="Unable to register account" list={authentication.error} /> }

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
          label="Confirm password"
          type='password'
          onChange={this.handleChange}
          name="passwordConfirm"
          autoComplete={"off"}
          value={passwordConfirm}
          validators={['required']}
          errorMessages={['this field is required']}
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
            {authentication.registering && <CircularProgress size={20} />} Register
          </Button>
        </Actions>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterForm))