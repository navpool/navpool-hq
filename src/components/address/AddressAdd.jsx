import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import AddressAddForm from "./AddressAddForm";
import axios from "axios";
import {AuthenticationService} from "../../services/AuthenticationService";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const styles = () => ({

})

class AddressAdd extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  state = {
    isFetching: false,
    isError: false,
    errors: {},
    didInvalidate: false,
  }

  addAddress(data) {
    axios.post('http://localhost:8085/address', data, {headers: {
        "Authorization": `Bearer ${AuthenticationService.getToken()}`,
      }})
      .then(() => {
        this.props.onSuccess()
      })
      .catch(error => {
        let errors = {}
        if (typeof error.response.data.errors !== "undefined") {
          errors = error.response.data.errors
        } else {
          errors = {global: error.response.data.error}
        }

        this.setState({
          isFetching: false,
          isError: true,
          didInvalidate: true,
          errors: errors
        })
      })
  }

  cancel() {
    this.props.onCancel();
  }

  render() {
    const {isFetching, isError, errors} = this.state

    return (
      <div>
        <h2>Add Address</h2>

        <Grid container spacing={40}>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <p>To add a new address to your pool account you'll need the public hash of the address and a signature to proof ownership.</p>
            <AddressAddForm handleSubmit={(data) => this.addAddress(data)} handleCancel={() => this.cancel()} isFetching={isFetching} isError={isError} errors={errors} />
          </Grid>

          <Grid item md={5} lg={5}>
            <h4>Follow these steps to create a verification signature:</h4>
            <ol>
              <li>Launch your NavCoin core wallet</li>
              <li>Select `Sign message...` from the File menu</li>
              <li>Enter the NavCoin address you are adding to NavPool</li>
              <li>Enter `REGISTER FOR NAVPOOL` as the message</li>
              <li>Click the `SIGN MESSAGE` button</li>
              <li>Copy the generated signature</li>
              <li>Paste the signature into form field on this page</li>
            </ol>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AddressAdd)