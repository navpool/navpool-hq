import {TableBody, TableCell, TableRow} from "@material-ui/core";
import React from "react";
import {navFormat} from "../../helpers";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

const styles = () => ({
  tableCell: {
    padding: "4px 0 4px 0",
  },
  tableCenter: {
    textAlign: "center",
    padding: "4px 0 4px 0",
  },
})

function StakingReportAddress(props) {
  const {classes, report} = props

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} variant="head">Period</TableCell>
            <TableCell className={classes.tableCenter} variant="head">#&nbsp;Stakes</TableCell>
            <TableCell className={classes.tableCenter} variant="head">Stake Reward</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell}>Last&nbsp;24&nbsp;hours</TableCell>
            <TableCell className={classes.tableCenter}>{report.last24Hours.stakes}</TableCell>
            <TableCell className={classes.tableCenter}>{navFormat(report.last24Hours.balance)}&nbsp;Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>Last&nbsp;7&nbsp;days</TableCell>
            <TableCell className={classes.tableCenter}>{report.last7Days.stakes}</TableCell>
            <TableCell className={classes.tableCenter}>{navFormat(report.last7Days.balance)}&nbsp;Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>Last&nbsp;30&nbsp;days</TableCell>
            <TableCell className={classes.tableCenter}>{report.last30Days.stakes}</TableCell>
            <TableCell className={classes.tableCenter}>{navFormat(report.last30Days.balance)}&nbsp;Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>Last&nbsp;year</TableCell>
            <TableCell className={classes.tableCenter}>{report.lastYear.stakes}</TableCell>
            <TableCell className={classes.tableCenter}>{navFormat(report.lastYear.balance)}&nbsp;Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>All time</TableCell>
            <TableCell className={classes.tableCenter}>{report.all.stakes}</TableCell>
            <TableCell className={classes.tableCenter}>{navFormat(report.all.balance)} Nav</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default withStyles(styles)(StakingReportAddress)
