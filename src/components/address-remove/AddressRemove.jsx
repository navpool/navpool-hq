import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {routes} from "../../config/routes";
import AddressRemoveForm from "./AddressRemoveForm";
import Panel from "../Panel";

class AddressRemove extends Component {
  handleRemoveCancel = () => {
    this.props.history.push(routes.ADDRESS.path)
  }

  componentDidMount() {
    const {address} = this.props
    if (address.removeAddress == null) {
      this.props.history.push(routes.ADDRESS.path)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {address, history} = this.props

    if (address.removeAddressFulfilled) {
      history.push(routes.ADDRESS.path)
    }
  }

  getAddress(address) {
    if (typeof address == 'undefined' || address.removeAddress == null) {
      return null
    }

    return address.addresses[address.removeAddress];
  }

  render() {
    const {address} = this.props
    const getAddress = this.getAddress(address)

    if (!getAddress) {
      return (<div/>)
    }

    return (
      <Panel title="Addresses" subTitle="Remove address">
          <p>Are you sure you want to remove the `{getAddress.spending_address}` address from your NavPool account?</p>
          <p>Once removed any balance that remains in the cold staking address will cease staking.</p>

          <AddressRemoveForm handleCancel={() => this.handleRemoveCancel()}/>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default withRouter(connect(mapStateToProps)(AddressRemove));
