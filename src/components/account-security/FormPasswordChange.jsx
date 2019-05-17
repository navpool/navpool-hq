import React, { Component } from 'react'
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles"
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import StatusBar from "../StatusBar";
import Actions from "../Actions";
import Button from "@material-ui/core/Button/index";

import {accountActions as actions} from "../../actions";

const styles = () => ({
  form: {
    marginBottom: 0,
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
});

class FormPasswordChange extends Component {
  state = {
    password: '',
    passwordNew: '',
    passwordConfirm: '',
  }

  handleChange = (event) => {
    const value = event.target.value
    const field = event.target.name

    this.setState({ [field]: value })
  };

  handleSubmit = () => {
    const {password, passwordNew, passwordConfirm} = this.state

    this.props.dispatch(actions.changePassword(password, passwordNew, passwordConfirm))
    this.setState({
      password: '',
      passwordNew: '',
      passwordConfirm: '',
    })
  }

  render() {
    const {classes, account} = this.props
    const {password, passwordNew, passwordConfirm} = this.state

    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit} className={classes.form}>
        { account.error && <StatusBar text={account.error.error} variant="error" /> }

        <TextValidator
          fullWidth
          label="Current password"
          type='password'
          onChange={this.handleChange}
          name="password"
          autoComplete={"off"}
          value={password}
          validators={['required']}
          errorMessages={['This field is required']}
          margin="none"
        />

        <TextValidator
          fullWidth
          label="New password"
          type='password'
          onChange={this.handleChange}
          name="passwordNew"
          autoComplete={"off"}
          value={passwordNew}
          validators={['required']}
          errorMessages={['This field is required']}
          margin="none"
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
          errorMessages={['This field is required']}
          margin="none"
        />

        <Actions>
          <Button className={classes.purpleButton} type="submit">Change password</Button>
        </Actions>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps)(withStyles(styles)(FormPasswordChange));