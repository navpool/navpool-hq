import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom"
import withStyles from '@material-ui/core/styles/withStyles'
import {AuthenticationService} from "../../services/AuthenticationService"

const styles = () => ({
  main: {
    width: '100%',
    display: 'block',
    height: '100%',
  }
});

function LoginLayout(props) {
  const { classes } = props

  if (AuthenticationService.isAuthenticated()) {
    return (<Redirect to='/'/>)
  }

  return (
    <main className={classes.main}>
      {props.children}
    </main>
  )
}

LoginLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginLayout)