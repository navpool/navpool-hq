import React from 'react'
import { connect } from 'react-redux'
import StakingReport from "./StakingReport";
import Welcome from "./Welcome";
import NetworkReport from "./NetworkReport";
import Page from "../Page";

class Dashboard extends React.Component {
  render() {
    const {address} = this.props
    const hasAddress = address.data !== null && address.data.length !== 0

    return (
      <Page title="Dashboard">
        <Welcome/>
        <NetworkReport />
        {hasAddress && <StakingReport /> }
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication,
  address: state.address,
})


export default connect(mapStateToProps)(Dashboard);