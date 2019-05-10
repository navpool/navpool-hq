import React, { Component } from 'react'
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles"
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button/index";

import StatusBar from "../StatusBar";
import {accountActions as actions} from "../../actions";
import PropTypes from "prop-types";
import Actions from "../Actions";
import QrCode from "../QrCode";

const styles = theme => ({
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
});

class FormTwoFactorEnable extends Component {
  static propTypes = {
    handleCancel: PropTypes.func.isRequired,
  }

  state = {
    verificationCode: '',
  }

  componentDidMount() {
    this.props.dispatch(actions.activateTwoFactor())
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

    this.props.dispatch(actions.enableTwoFactor(verificationCode))
  }

  render() {
    const {classes, account} = this.props
    const {verificationCode} = this.state

    if (!account.enabledTwoFactor) {
      return (<div />)
    }

    return (
      <div>
        <p>Scan the QR code below with your two-factor authentication app on your phone.</p>
        <p>If you can't scan enter this secret key instead: {account.account.two_factor.secret}</p>

        <QrCode value={account.account.two_factor.otpauth} alt={account.account.two_factor.secret} />

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
            <Button variant="contained" type="submit" className={classes.purpleButton} size="small">Enable</Button>
            <Button onClick={this.handleCancel} color="secondary" variant="contained" size="small">Cancel</Button>
          </Actions>
        </ValidatorForm>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps)(withStyles(styles)(FormTwoFactorEnable));