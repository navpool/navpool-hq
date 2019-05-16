import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles"
import Button from '@material-ui/core/Button/index'
import CircularProgress from '@material-ui/core/CircularProgress/index'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

import {addressActions as actions} from "../../actions";
import StatusBar from "../StatusBar";
import Actions from "../Actions";
import {Modal} from "@material-ui/core";
import HelpAddressVerification from "../help/HelpAddressVerification";

const styles = () => ({
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

const defaultState = {
  hash: '',
  signature: '',
  modalVerificationOpen: false,
}

class AddressAddForm extends Component {
  static propTypes = {
    handleCancel: PropTypes.func.isRequired,
  }

  state = defaultState

  handleChange = (event) => {
    const value = event.target.value
    const field = event.target.name

    this.setState({ [field]: value })
  };

  handleSubmit = () => {
    const { hash, signature} = this.state;

    this.props.dispatch(actions.addAddress(hash, signature))
  }

  handleCancel = () => {
    this.setState(defaultState)
    this.props.handleCancel()
  }

  modalVerificationOpen = () => {
    this.setState({ modalVerificationOpen: true });
  };

  modalVerificationClose = () => {
    this.setState({ modalVerificationOpen: false });
  };

  render() {
    const { hash, signature, modalVerificationOpen } = this.state
    const { classes, address } = this.props

    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        { address.error && <StatusBar text="Unable to add the address" list={address.error.errors} variant="error" /> }

        <TextValidator
          fullWidth
          label="Address hash"
          onChange={this.handleChange}
          name="hash"
          autoComplete={"off"}
          value={hash}
          validators={['required']}
          errorMessages={['This field is required']}
          margin="normal"
        />

        <TextValidator
          fullWidth
          label="Verification signature"
          onChange={this.handleChange}
          name="signature"
          autoComplete={"off"}
          value={signature}
          validators={['required']}
          errorMessages={['This field is required']}
          margin="normal"
        />

        <Button onClick={this.modalVerificationOpen}>What is a verification signature?</Button>

        <Actions>
          <Button variant="contained" type="submit" disabled={address.addingAddress} className={classes.purpleButton} size="small">
            {address.addingAddress && <CircularProgress size={20} />} Add Address
          </Button>
          <Button variant="contained" color="secondary" onClick={this.handleCancel} size="small">Cancel</Button>
        </Actions>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalVerificationOpen}
          onClose={this.modalVerificationClose}>
          <HelpAddressVerification />
        </Modal>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default connect(mapStateToProps)(withStyles(styles)(AddressAddForm));