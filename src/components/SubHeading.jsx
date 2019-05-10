import {Divider} from "@material-ui/core";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  subTitle: {
    paddingBottom: theme.spacing.unit,
  }
})

function SubHeading(props) {
  const {classes, title, subTitle} = props

  return (
    <div>
      <h3>{title}</h3>
      <Divider className={classes.divider} />
      {subTitle && <h4 className={classes.subTitle}>{subTitle}</h4>}

    </div>
  )
}

export default withStyles(styles)(SubHeading)