import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles"
import Button from '@material-ui/core/Button/index'
import { ValidatorForm } from 'react-material-ui-form-validator'

import {addressActions as actions} from "../../actions";
import Actions from "../Actions";

const styles = () => ({
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

    dispatch(actions.removeAddress(address))
  }

  handleCancel = () => {
    this.props.handleCancel()
  }

  render() {
    const {classes} = this.props

    return (
      <ValidatorForm ref="form" onSubmit={() => this.handleSubmit()}>
        <Actions>
          <Button variant="contained" type="submit" className={classes.purpleButton}>Remove Address</Button>
          <Button variant="contained" color="secondary" onClick={this.handleCancel} component={Link} to="/addresses">Cancel</Button>
        </Actions>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(withStyles(styles)(AddressRemoveForm));