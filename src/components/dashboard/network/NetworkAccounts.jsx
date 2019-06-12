import {Divider} from "@material-ui/core";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    textAlign: "center",
  },
  accounts: {
    marginTop: '20px',
    fontSize: '3.75rem',
  },
  error: {
    marginTop: '20px',
    fontSize: '2rem',
  }
})

function NetworkAccounts(props) {
  const {classes, accounts} = props

  return (
    <div className={classes.root}>
      <h3>Accounts</h3>
      <Divider/>
      { accounts ? <div className={classes.accounts}>{accounts}</div> : <div className={classes.error}>--</div> }
    </div>
  )
}

export default withStyles(styles)(NetworkAccounts)
