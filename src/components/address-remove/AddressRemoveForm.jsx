import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles"
import Button from '@material-ui/core/Button/index'
import CircularProgress from '@material-ui/core/CircularProgress/index'
import { ValidatorForm } from 'react-material-ui-form-validator'

import {addressActions as actions} from "../../actions";
import Actions from "../Actions";

const styles = theme => ({
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class AddressRemoveForm extends Component {
  static propTypes = {
    handleCancel: PropTypes.func.isRequired,
  }

  handleSubmit = () => {
    const {dispatch, address} = this.props

    dispatch(actions.removeAddress(address.removeAddress))
  }

  handleCancel = () => {
    this.props.handleCancel()
  }

  render() {
    const { classes, address } = this.props

    return (
      <ValidatorForm ref="form" onSubmit={() => this.handleSubmit()}>
        <Actions>
          <Button variant="contained" type="submit" disabled={address.removingAddress} className={classes.purpleButton}>
            {address.removingAddress && <CircularProgress size={20} />} Remove Address
          </Button>
          <Button variant="contained" color="secondary" onClick={this.handleCancel} component={Link} to="/addresses">Cancel</Button>
        </Actions>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default connect(mapStateToProps)(withStyles(styles)(AddressRemoveForm));