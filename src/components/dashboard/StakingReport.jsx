import React from 'react'
import { connect } from 'react-redux'

import Panel from "../Panel";
import {reportActions as actions} from "../../actions";
import StakingReportAddress from "./StakingReportAddress";

class StakingReport extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getStakingReport())
  }


  render() {
    const {report} = this.props
    let addressReports = null

    if (!report.loadingReportStaking) {
      addressReports = report.staking.map((item) => {
        return <StakingReportAddress report={item}/>
      })
    }

    return (
      <Panel title="Staking report">
        {addressReports}
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  report: state.report,
})


export default connect(mapStateToProps)(StakingReport);