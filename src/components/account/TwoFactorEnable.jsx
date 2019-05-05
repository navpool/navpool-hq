import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import {Button, DialogContent, Modal} from "@material-ui/core"
import PropTypes from "prop-types";
import TwoFactorModalEnable from "./TwoFactorModalEnable";

const styles = (theme) => ({
  root: {
    paddingBottom: theme.spacing.unit,
  },
  subtitle: {
    marginBottom: theme.spacing.unit,
  },
  divider: {
    marginTop: theme.spacing.unit,
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

class TwoFactorEnable extends Component {
  static propTypes = {
    handleSuccess: PropTypes.func.isRequired,
  }

  state = {
    enabling: false,
    verificationCode: '',
  }

  handleOpenEnableModal = () => {
    this.setState({
      enabling: true,
    })
  };

  handleCloseEnableModal = () => {
    this.setState({
      enabling: false,
    })
  }

  handleSuccess = () => {
    this.props.handleSuccess()
  }

  render() {
    const {classes} = this.props
    const {enabling} = this.state

    return (
      <div className={classes.root}>
        <div>
          <h4 className={this.props.classes.subtitle}>Two-factor authentication is not enabled on your account</h4>
          <p>Two-factor authentication adds an additional layer of security to your account.</p>
          <p>We'll ask for it on login and when voting on the community fund.</p>

          <div className={this.props.classes.actions}>
            <Button variant={"contained"} className={this.props.classes.purpleButton} onClick={this.handleOpenEnableModal}>Enable</Button>
          </div>
        </div>

        <Modal open={enabling}>
          <DialogContent>
            <TwoFactorModalEnable handleSuccess={() => this.handleSuccess()} handleClose={() => this.handleCloseEnableModal()} />
          </DialogContent>
        </Modal>

      </div>
    )
  }
}

export default withStyles(styles)(TwoFactorEnable)