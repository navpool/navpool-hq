import React from 'react'
import { connect } from 'react-redux'
import Heading from "../Heading";
import StakingReport from "./StakingReport";
import Welcome from "./Welcome";

class Dashboard extends React.Component {
  render() {
    const {address} = this.props
    const hasAddress = address.data !== null && address.data.length !== 0

    return (
      <div>
        <Heading title="Dashboard" />
        <Welcome/>

        {hasAddress &&
          <div>
            <StakingReport />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication,
  address: state.address,
})


export default connect(mapStateToProps)(Dashboard);