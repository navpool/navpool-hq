import React from 'react'
import { connect } from 'react-redux'
import Heading from "../Heading";
import StakingReport from "./StakingReport";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Heading title="Dashboard" />

        <StakingReport />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication
})


export default connect(mapStateToProps)(Dashboard);