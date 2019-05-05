import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import {Button, DialogContent, Modal} from "@material-ui/core";
import PropTypes from "prop-types";
import ModalTwoFactorDisable from "./TwoFactorModalDisable";

const styles = (theme) => ({
  root: {
    paddingBottom: theme.spacing.unit,
  },
  subtitle: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit,
  },
  actions: {
    marginTop: theme.spacing.unit,
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class TwoFactorEnabled extends Component {
  static propTypes = {
    handleSuccess: PropTypes.func.isRequired,
  }

  state = {
    disabling: false,
    verificationCode: '',
  }

  handleOpenDisableModal = () => {
    this.setState({
      disabling: true,
    })
  };

  handleCloseDisableModal = () => {
    this.setState({
      disabling: false,
    })
  }

  handleSuccess = () => {
    this.props.handleSuccess()
  }

  render() {
    const {classes} = this.props
    const {disabling} = this.state

    return (
      <div className={classes.root}>
        <h4>Two-factor authentication is enabled on your account</h4>
        <p>Two-factor authentication adds an additional layer of security to your account.</p>
        <p>We'll ask for it on login and when voting on the community fund.</p>

        <div className={this.props.classes.actions}>
          <Button variant={"contained"} className={this.props.classes.purpleButton} onClick={this.handleOpenDisableModal}>
            Disable 2FA
          </Button>
        </div>

        <Modal open={disabling}>
          <DialogContent>
            <ModalTwoFactorDisable handleSuccess={() => this.handleSuccess()} handleClose={() => this.handleCloseDisableModal()} />
          </DialogContent>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(TwoFactorEnabled)