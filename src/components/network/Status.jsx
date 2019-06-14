import React from 'react'
import { connect } from 'react-redux'

import withStyles from "@material-ui/core/styles/withStyles";
import Panel from "../Panel";

import {reportActions as actions} from "../../actions";
import StatusAccounts from "./status/StatusAccounts";
import StatusWeight from "./status/StatusWeight";
import StatusPower from "./status/StatusPower";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
})

class Status extends React.Component {
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
              <StatusAccounts accounts={report.network ? report.network.accounts : null} />
            </Grid>
            <Grid item xs>
              <StatusWeight weight={report.network ? report.network.weight : null} />
            </Grid>
            <Grid item xs>
              <StatusPower staking={report.network ? report.network.staking : null} />
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


export default connect(mapStateToProps)(withStyles(styles)(Status));