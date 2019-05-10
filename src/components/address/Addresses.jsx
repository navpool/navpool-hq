import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"

import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button/index"
import Actions from "../Actions";

import CardAddress from "./CardAddress";
import CardNoAddresses from "./CardNoAddresses";

import {routes} from "../../config/routes";
import {addressActions as actions} from "../../actions"
import Page from "../Page";

const styles = theme => ({
  addresses: {
    marginTop: theme.spacing.unit * 2,
    maxWidth: '750px',
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class Addresses extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getAddresses())
  }

  render() {
    const {classes, address} = this.props

    if (address.loading) {
      return (<div />)
    }

    return (
      <Page title="Addresses">

        { address.addresses.length === 0 && <CardNoAddresses/> }
        <div className={classes.addresses}>
          {address.addresses.map((p, key) =>
            <CardAddress key={key} index={key+1} address={p} />
          )}
          {/*            <IconButton aria-label="Delete" className={classes.margin} onClick={() => this.handleRemoveAddress(key)}>*/}
        </div>

        <Actions>
          <Button variant="contained" className={classes.purpleButton} component={Link} to={routes.ADDRESS_ADD.path}>
            Add Address
          </Button>
        </Actions>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default connect(mapStateToProps)(withStyles(styles)(Addresses))