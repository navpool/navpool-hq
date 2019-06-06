import React from 'react'
import { connect } from 'react-redux'

import withStyles from "@material-ui/core/styles/withStyles";
import {Table, TableHead, TableBody, TableCell, TableRow} from "@material-ui/core";
import Panel from "../Panel";
import {navFormat} from "../../helpers";

import {reportActions as actions} from "../../actions";

const styles = () => ({
  tableCell: {
    padding: "4px 0 4px 0",
    width: '40%',
  },
  tableCenter: {
    textAlign: "center",
    padding: "4px 0 4px 0",
    width: '10%',
  },
  tableRight: {
    textAlign: "right",
    padding: "4px 0 4px 0",
    width: '50%',
  },
})

class StakingReport extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getStakingReport())
  }

  render() {
    const {classes, report} = this.props
    const loaded = !report.loadingReportStaking && !report.errorReportStaking

    return (
      <Panel title="Staking report">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} variant="head">Period</TableCell>
              <TableCell className={classes.tableCenter} variant="head">Stakes</TableCell>
              <TableCell className={classes.tableRight} variant="head">Stake Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tableCell}>Last&nbsp;24&nbsp;hours</TableCell>
              <TableCell className={classes.tableCenter}>{ loaded ? report.staking.last24Hours.stakes : '--'}</TableCell>
              <TableCell className={classes.tableRight}>{ loaded ? navFormat(report.staking.last24Hours.balance)+" Nav" : '--' }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>Last&nbsp;7&nbsp;days</TableCell>
              <TableCell className={classes.tableCenter}>{ loaded ? report.staking.last7Days.stakes : '--'}</TableCell>
              <TableCell className={classes.tableRight}>{ loaded ? navFormat(report.staking.last7Days.balance)+" Nav" : '--' }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>Last&nbsp;30&nbsp;days</TableCell>
              <TableCell className={classes.tableCenter}>{ loaded ? report.staking.last30Days.stakes : '--'}</TableCell>
              <TableCell className={classes.tableRight}>{ loaded ? navFormat(report.staking.last30Days.balance)+" Nav" : '--' }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>Last&nbsp;year</TableCell>
              <TableCell className={classes.tableCenter}>{ loaded ? report.staking.lastYear.stakes : '--'}</TableCell>
              <TableCell className={classes.tableRight}>{ loaded ? navFormat(report.staking.lastYear.balance)+" Nav" : '--' }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>All time</TableCell>
              <TableCell className={classes.tableCenter}>{ loaded ? report.staking.all.stakes : '--'}</TableCell>
              <TableCell className={classes.tableRight}>{ loaded ? navFormat(report.staking.all.balance)+" Nav" : '--' }</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  report: state.report,
})


export default connect(mapStateToProps)(withStyles(styles)(StakingReport));