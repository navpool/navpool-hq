import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
  },
})

function QrCode(props) {
  const {classes, value, alt} = props

  const src = 'https://chart.apis.google.com/chart?cht=qr&chs=190x190&chld=L|0&chl='+encodeURIComponent(value)

  return (
    <div className={classes.root}>
      <img src={src} alt={alt} />
    </div>
  )
}

export default withStyles(styles)(QrCode)
