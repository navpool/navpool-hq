import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  main: {
    width: '100%',
    display: 'block',
    height: '100%',
  }
});

function LoginLayout(props) {
  const { classes } = props

  return (
    <main className={classes.main}>
      {props.children}
    </main>
  )
}

export default withStyles(styles)(LoginLayout)