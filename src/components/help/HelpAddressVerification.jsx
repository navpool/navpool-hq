import React, {Component} from 'react'
import {isMobileOnly} from 'react-device-detect';

import {withStyles} from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  root: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
  rootMobile: {
    position: 'absolute',
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
  list: {
    padding: theme.spacing.unit * 2,
  }
});

class HelpAddressVerification extends Component {
  render() {
    const {classes} = this.props

    return (
      <div style={getModalStyle()} className={isMobileOnly ? classes.rootMobile : classes.root}>
        <h5>What is a verification signature?</h5>

        <p>The verification signature is proof that you own the address you want to add to your NavPool account</p>

        <p><br/>Complete the following steps to create a verification signature</p>
        <ol className={classes.list}>
          <li>Launch your NavCoin core wallet</li>
          <li>Select `Sign message...` from the File menu</li>
          <li>Enter the NavCoin address you are adding to NavPool</li>
          <li>Enter `REGISTER FOR NAVPOOL` as the message</li>
          <li>Click the `SIGN MESSAGE` button</li>
          <li>Copy the generated signature</li>
          <li>Paste the signature into form field on this page</li>
        </ol>
      </div>
    )
  }
}

export default withStyles(styles)(HelpAddressVerification);