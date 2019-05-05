import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button";
import axios from "axios";
import {AuthenticationService} from "../../services/AuthenticationService";
import StatusBar from "../StatusBar";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import PropTypes from "prop-types";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: `90%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  root: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
  actions: {
    marginTop: theme.spacing.unit * 2,
    textAlign: "right",
    "& button": {
      "marginLeft": theme.spacing.unit * 2,
    }
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
});

class TwoFactorModalDisable extends Component {
  static propTypes = {
    handleSuccess: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  }

  state = {
    verificationCode: '',
  }

  handleSubmit = () => {
    const data = {
      code: this.state.verificationCode,
    }
    axios.post('http://localhost:8085/2fa/disable', data, {headers: {
        "Authorization": `Bearer ${AuthenticationService.getToken()}`,
      }})
      .then(() => {
        this.props.handleSuccess()
      })
      .catch(error => {
        console.log(error)
        let errors = {}
        if (typeof error.response.data.errors !== "undefined") {
          errors = error.response.data.errors
        } else {
          errors = {global: error.response.data.error}
        }

        this.setState({
          errors: errors
        })
      })

  }

  handleClose = () => {
    this.props.handleClose()
  }

  handleChange = (event) => {
    const value = event.target.value
    const field = event.target.name

    if (value.length > 6 || isNaN(value)) {
      return
    }

    this.setState({ [field]: value })
  };

  render() {
    const {classes} = this.props
    const {verificationCode, errors} = this.state

    return (
      <div style={getModalStyle()} className={classes.root}>
        <div>
          <h4>Disable two-factor authentication</h4>
          <p><br/>Confirm your two factor authentication code to disable 2fa on your account?</p>
        </div>

        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          { errors && <StatusBar text={errors.global} variant="error" /> }

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

          <div className={classes.actions}>
            <Button onClick={this.handleClose} color="secondary" variant="contained" size="small">Cancel</Button>
            <Button variant="contained" type="submit" className={classes.purpleButton} size="small">Disable</Button>
          </div>
        </ValidatorForm>
      </div>
    )
  }
}


export default withStyles(styles)(TwoFactorModalDisable)