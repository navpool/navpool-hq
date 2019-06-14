import {Divider} from "@material-ui/core";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    textAlign: "center",
  },
  weight: {
    marginTop: '20px',
    fontSize: '2rem',
  }
})

function StatusWeight(props) {
  const {classes, weight} = props

  return (
    <div className={classes.root}>
      <h3>Balance</h3>
      <Divider/>
      <div className={classes.weight}>{weight ? <div>{Math.ceil(weight / 100000000)}<br/>Nav</div> : '--'}</div>
    </div>
  )
}

export default withStyles(styles)(StatusWeight)
