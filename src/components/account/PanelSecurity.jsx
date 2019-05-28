import React , {Component} from 'react'
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles"
import Panel from "../Panel";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {routes} from "../../config/routes";
import Actions from "../Actions";

const styles = () => ({
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class PanelSecurity extends Component {
  render() {
    const {classes, account} = this.props
    const active = account.data.two_factor.active;

    const subTitle = active ? 'Two-factor authentication is enabled' : 'Two-factor authentication is disabled'

    return (
      <Panel title="Security" subTitle={subTitle}>
        <p>
          Two-factor authentication adds an additional layer of security to your account.
          We'll ask you to confirm your 2FA when you login to your account.
        </p>

        <Actions>
          <Button className={classes.purpleButton} component={Link} to={routes.ACCOUNT_SECURITY.path}>
            {active ? 'Disable' : 'Enable'}
          </Button>
        </Actions>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps)(withStyles(styles)(PanelSecurity));