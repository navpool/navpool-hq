import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button";
import axios from "axios";
import {AuthenticationService} from "../../services/AuthenticationService";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: `90%`,
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
  actions: {
    marginTop: theme.spacing.unit * 2,
    textAlign: "right",
    "& button": {
      "marginLeft": theme.spacing.unit * 2,
    }
  }
});

class ModalDeleteAddress extends Component {
  deleteAddress = (address) => {
    axios.delete('http://localhost:8085/address/'+address, {headers: {
        "Authorization": `Bearer ${AuthenticationService.getToken()}`,
      }})

    this.props.handleClose(this.state)
  }

  handleClose = () => {
    this.props.handleClose(this.state)
  }

  render() {
    const {classes, address} = this.props

    return (
      <div style={getModalStyle()} className={classes.root}>
        <div>
          <h4>Remove Address</h4>
          <p>Are you sure you want to remove this address from your account?</p>
          <p>{address}</p>
        </div>
        <div className={classes.actions}>
          <Button onClick={this.handleClose} color="secondary" variant="contained" size="small">Cancel</Button>
          <Button onClick={() => this.deleteAddress(address)} color="primary" variant="contained" size="small">Remove</Button>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(ModalDeleteAddress)