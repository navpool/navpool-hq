import React , {Component} from 'react'
import {connect} from "react-redux";

import Panel from "../Panel";
import FormPasswordChange from "../account-security/FormPasswordChange";

class PanelPassword extends Component {
  render() {
    return (
      <Panel title="Reset your password">
        <p>To reset your password enter your current password, your new password and confirm your new password</p>
        <FormPasswordChange />
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps)(PanelPassword);