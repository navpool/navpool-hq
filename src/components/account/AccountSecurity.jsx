import React , {Component} from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import Paper from "@material-ui/core/Paper";
import TwoFactorEnable from "./TwoFactorEnable";
import Divider from "@material-ui/core/Divider";
import TwoFactorEnabled from "./TwoFactorEnabled";

const styles = theme => ({
  root: {
    clear: "both",
    marginTop: theme.spacing.unit * 4,
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit,
  },
  colorSwitchBase: {
    color: "#7d5ab5",
    '&$colorChecked': {
      color: "#5d3f8d",
      '& + $colorBar': {
        backgroundColor: "#5d3f8d",
      },
    },
  },
  colorBar: {},
  colorChecked: {},
})

class AccountSecurity extends Component {
  state = {
    twoFactorDisplay: false,
    enabled: false
  }

  componentDidMount() {
    const {account} = this.props

    this.setState({enabled: account.two_factor.active})
  }

  handleSuccess = () => {
    this.setState({
      enabled: !this.state.enabled,
    })
  }

  render() {
    const {classes} = this.props
    const {enabled} = this.state

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h3>Security</h3>
          <Divider className={classes.divider}/>

          {enabled ? <TwoFactorEnabled handleSuccess={this.handleSuccess} /> : <TwoFactorEnable handleSuccess={this.handleSuccess} />}
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AccountSecurity)