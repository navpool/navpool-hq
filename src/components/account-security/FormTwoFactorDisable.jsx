import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles"
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button/index";

import StatusBar from "../StatusBar";
import {accountActions as actions} from "../../actions";
import PropTypes from "prop-types";
import Actions from "../Actions";

const styles = () => ({
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
});

class FormTwoFactorDisable extends Component {
  static propTypes = {
    handleCancel: PropTypes.func.isRequired,
  }

  state = {
    verificationCode: '',
  }

  handleCancel = () => {
    this.setState({
      verificationCode: '',
    })
    this.props.handleCancel();
  }

  handleChange = (event) => {
    const value = event.target.value
    const field = event.target.name

    if (value.length > 6 || isNaN(value)) {
      return
    }

    this.setState({ [field]: value })
  };

  handleSubmit = () => {
    const {verificationCode} = this.state

    this.props.dispatch(actions.disableTwoFactor(verificationCode))
  }

  render() {
    const {classes, account} = this.props
    const {verificationCode} = this.state

    return (
      <div>
        <p>Confirm your authentication code to disable 2FA on your account?</p>

        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          { account.error && <StatusBar text={account.error.error} variant="error" /> }

          <TextValidator
            fullWidth
            label="Authentication code"
            onChange={this.handleChange}
            name="verificationCode"
            autoComplete={"off"}
            value={verificationCode}
            validators={['required', 'isNumber']}
            errorMessages={['This field is required']}
            margin="none"
          />

          <Actions>
            <Button variant="contained" type="submit" className={classes.purpleButton}>Disable</Button>
            <Button onClick={this.handleCancel} color="secondary" variant="contained">Cancel</Button>
          </Actions>
        </ValidatorForm>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(FormTwoFactorDisable)));