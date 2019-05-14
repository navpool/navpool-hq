import React, {Component} from 'react'
import {connect} from "react-redux";

import Page from "../Page";
// import PanelPassword from "./PanelPassword";
import PanelPersonalDetails from "./PanelPersonalDetails";
import PanelSecurity from "./PanelSecurity";

import {accountActions as actions} from "../../actions";

class Account extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getAccount())
  }

  render() {
    const {account} = this.props

    if (account.loading) {
      return (<div/>)
    }

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
