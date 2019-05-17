import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {routes} from "../../config/routes";
import AddressRemoveForm from "./AddressRemoveForm";
import Panel from "../Panel";
import {addressActions as actions} from "../../actions";
import Page from "../Page";

class AddressRemove extends Component {
  handleRemoveCancel = () => {
    this.props.history.push(routes.ADDRESS.path)
  }

  componentDidMount() {
    const {dispatch} = this.props
    const {id} = this.props.match.params

    dispatch(actions.removeAddressLoad(id))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {address, history} = this.props

    if (address.failure === true || address.removeAddressFulfilled) {
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

    if (address.loading) {
      return (<div/>)
    }

    if (address.failure) {
      return (<div/>)
    }

    if (address.removeAddress == null) {
      return (<div/>)
    }

    return (
      <Page title="Addresses">
        <Panel title="Remove address">
          <p>Are you sure you want to remove the `{address.removeAddress.spending_address}` address from your NavPool account?</p>
          <p>Once removed any balance that remains in the cold staking address will cease staking.</p>

          <AddressRemoveForm handleCancel={() => this.handleRemoveCancel()}/>
        </Panel>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default withRouter(connect(mapStateToProps)(AddressRemove));
