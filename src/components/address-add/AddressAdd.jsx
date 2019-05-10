import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
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
              To add a new address to your pool account you'll need the public hash of the address and a signature to prove ownership.<br/>
              {/*<Link>What is a verification signature?</Link>*/}
            </p>

            <AddressAddForm handleCancel={() => this.handleAddCancel()}/>

            {/*<Divider />*/}
            {/*<h4>Follow these steps to create a verification signature:</h4>*/}
            {/*<ol>*/}
            {/*  <li>Launch your NavCoin core wallet</li>*/}
            {/*  <li>Select `Sign message...` from the File menu</li>*/}
            {/*  <li>Enter the NavCoin address you are adding to NavPool</li>*/}
            {/*  <li>Enter `REGISTER FOR NAVPOOL` as the message</li>*/}
            {/*  <li>Click the `SIGN MESSAGE` button</li>*/}
            {/*  <li>Copy the generated signature</li>*/}
            {/*  <li>Paste the signature into form field on this page</li>*/}
            {/*</ol>*/}
          </Panel>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default withRouter(connect(mapStateToProps)(AddressAdd));