import {Divider, TableBody, TableCell, TableRow} from "@material-ui/core";
import React from "react";
import {navFormat} from "../../helpers";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";

const styles = () => ({
  tableCell: {
    paddingLeft: 0,
  },
})

function StakingReportAddress(props) {
  const {classes, report} = props

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell}>Last 24 hours</TableCell>
            <TableCell>{navFormat(report.last24Hours.balance)} Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>Last 7 days</TableCell>
            <TableCell>{navFormat(report.last7Days.balance)} Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>Last 30 days</TableCell>
            <TableCell>{navFormat(report.last30Days.balance)} Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>Last year</TableCell>
            <TableCell>{navFormat(report.lastYear.balance)} Nav</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>All time</TableCell>
            <TableCell>{navFormat(report.all.balance)} Nav</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default withStyles(styles)(StakingReportAddress)
