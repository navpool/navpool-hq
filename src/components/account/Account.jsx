import React, {Component} from 'react'
import {connect} from "react-redux";

import Page from "../Page";
import PanelPersonalDetails from "./PanelPersonalDetails";
import PanelSecurity from "./PanelSecurity";

class Account extends Component {

  render() {
    return (
      <Page title="Account">
        <PanelPersonalDetails />
        <PanelSecurity />
        {/*<PanelPassword />*/}
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps)(Account);
