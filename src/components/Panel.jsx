import React from "react";

import withStyles from "@material-ui/core/styles/withStyles"
import Paper from "@material-ui/core/Paper";
import SubHeading from "./SubHeading";

const styles = theme => ({
  root: {
    clear: 'both',
    maxWidth: '750px',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    '& p': {
      paddingBottom: theme.spacing.unit / 2,
    }
  }
})

function Panel(props) {
  const {children, classes, title, subTitle} = props

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {title ? <SubHeading title={title} subTitle={subTitle} /> : ''}

        {children}
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Panel)