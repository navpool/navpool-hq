import React, {Component} from 'react'
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";

import Page from "../Page";
import FormTwoFactorEnable from "./FormTwoFactorEnable";
import FormTwoFactorDisable from "./FormTwoFactorDisable";

import {routes} from "../../config/routes";
import Panel from "../Panel";

const styles = () => ({

})

class AccountSecurity extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {account, history} = this.props

    if (account.twoFactorFulfilled) {
      history.push(routes.ACCOUNT.path)
    }
  }

  handleCancel = () => {
    const {history} = this.props

    history.push(routes.ACCOUNT.path)
  }

  render() {
    const {account} = this.props
    const active = account.data.two_factor.active;

    return (
      <Page title="Account">
        <Panel title={active ? 'Disable Two factor Authentication' : 'Enable Two factor Authentication'}>
        { !active && <FormTwoFactorEnable handleCancel={() => this.handleCancel()} /> }
        { active && <FormTwoFactorDisable handleCancel={() => this.handleCancel()} /> }
        </Panel>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps)(withStyles(styles)(AccountSecurity));