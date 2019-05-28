import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {routes} from "../../config/routes";
import AddressAddForm from "./AddressAddForm";
import Page from "../Page";
import Panel from "../Panel";

class AddressAdd extends Component {
  handleAddCancel = () => {
    const {history} = this.props

    history.push(routes.ADDRESS.path)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate")
    const {address, history} = this.props

    if (address.addAddressFulfilled) {
      history.push(routes.ADDRESS.path)
    }
  }

  render() {
    return (
        <Page title="Addresses">
          <Panel title="Add new address">
            <p>
              To add a new address to your pool account you'll need the public hash of the address and a signature to prove ownership.
            </p>

            <AddressAddForm handleCancel={() => this.handleAddCancel()} />
          </Panel>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default withRouter(connect(mapStateToProps)(AddressAdd));