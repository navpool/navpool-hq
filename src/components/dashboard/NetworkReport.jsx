import React from 'react'
import { connect } from 'react-redux'

import withStyles from "@material-ui/core/styles/withStyles";
import Panel from "../Panel";

import {reportActions as actions} from "../../actions";
import NetworkAccounts from "./network/NetworkAccounts";
import NetworkWeight from "./network/NetworkWeight";
import NetworkStaking from "./network/NetworkStaking";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
})

class NetworkReport extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getNetworkReport())
  }

  render() {
    const {classes, report} = this.props
    const loaded = !report.loadingReportNetwork && !report.errorReportNetwork

    return (
      <Panel>
        <div className={classes.root}>
          {loaded &&
          <Grid container>
            <Grid item xs >
              <NetworkAccounts accounts={report.network ? report.network.accounts : null} />
            </Grid>
            <Grid item xs>
              <NetworkWeight weight={report.network ? report.network.weight : null} />
            </Grid>
            <Grid item xs>
              <NetworkStaking staking={report.network ? report.network.staking : null} />
            </Grid>
          </Grid>
          }
        </div>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  report: state.report,
})


export default connect(mapStateToProps)(withStyles(styles)(NetworkReport));