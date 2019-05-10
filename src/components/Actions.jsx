import React from "react";
import {isMobileOnly} from 'react-device-detect';

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    '& button:not(:last-child)': {
      marginRight: theme.spacing.unit * 2,
    },
  },
  rootMobile: {
    position: 'absolute',
    bottom: 0,
    height: '60px',
    backgroundColor: '#7d5ab5',
    width: '100%',
    left: 0,
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    '& button:not(:last-child)': {
      marginRight: theme.spacing.unit * 2,
    },
  }
})

function Actions(props) {
  const {children, classes} = props

  return (
    <div className={isMobileOnly ? classes.root : classes.root}>
      {children}
    </div>
  )
}

export default withStyles(styles)(Actions)
