import React from "react";

import withStyles from '@material-ui/core/styles/withStyles'
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 6,
    textAlign: "center",
    "& h5": {
      color: grey[500],
    }
  },
});

function NoAddresses(props) {
  const {classes} = props

  return (
    <Paper className={classes.root}>
      <Typography variant={"h5"}>You do not have any addresses registered to your account.</Typography>
    </Paper>
  )
}

export default withStyles(styles)(NoAddresses)
