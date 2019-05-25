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
    const loaded = !report.loadingReportStaking && !report.errorReportStaking

    return (
      <Panel title="Staking report">
        {loaded && <StakingReportAddress report={report.staking} />}
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  report: state.report,
})


export default connect(mapStateToProps)(StakingReport);