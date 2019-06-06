import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const styles = () => ({
  main: {
    width: '100%',
    display: 'block',
    height: '100%',
  }
});

class LoginLayout extends Component {
  render() {
    const {classes, children} = this.props

    return (
      <main className={classes.main}>
        {children}
      </main>
    )
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(LoginLayout)));