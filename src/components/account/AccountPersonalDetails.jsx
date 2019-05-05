import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    clear: "both",
    marginTop: theme.spacing.unit * 4,
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit,
  }
})

function AccountPersonalDetails(props) {
  const {classes} = props

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h3>Personal details</h3>
        <Divider className={classes.divider}/>

        <p>This is an anonymous staking pool. We do not hold any personal details.</p>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(AccountPersonalDetails)