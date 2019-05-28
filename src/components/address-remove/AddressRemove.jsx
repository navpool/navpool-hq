import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {routes} from "../../config/routes";
import AddressRemoveForm from "./AddressRemoveForm";
import Panel from "../Panel";
import Page from "../Page";

class AddressRemove extends Component {
  state = { address: null };

  handleRemoveCancel = () => {
    this.props.history.push(routes.ADDRESS.path)
  }

  componentDidMount() {
    const {history, match, address} = this.props
    const {id} = match.params

    const addressToRemove = address.data.reduce((result, item) => {
      if (item.id === id) { result = item }
      return result
    }, null)

    if (addressToRemove === null) {
      history.push(routes.ADDRESS.path)
    }

    this.setState({
      address: addressToRemove,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {address, history} = this.props

    if (address.removeAddressFulfilled) {
      history.push(routes.ADDRESS.path)
    }
  }

  render() {
    const {address} = this.state

    if (address == null) {
      return (<div/>)
    }

    return (
      <Page title="Addresses">
        <Panel title="Remove address">
          <p>Are you sure you want to remove the `{address.spending_address}` address from your NavPool account?</p>
          <p>Once removed any balance that remains in the cold staking address will cease staking.</p>

          <AddressRemoveForm handleCancel={() => this.handleRemoveCancel()} address={address} />
        </Panel>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default withRouter(connect(mapStateToProps)(AddressRemove));
