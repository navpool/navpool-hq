import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"

import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button/index"
import Actions from "../Actions";

import Address from "./Address";
import NoAddresses from "./NoAddresses";

import {routes} from "../../config/routes";
import {addressActions as actions} from "../../actions"
import Page from "../Page";
import AddressesFailure from "./AddressesFailure";

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

  RenderContent = () => {
    const {address} = this.props

    if (address.loading) {
      return (<div />)
    }

    if (address.failure) {
      return (<AddressesFailure />)
    }

    if (address.addresses.length === 0) {
      return (<NoAddresses/>)
    }

    return (<div>
        {address.addresses.map((p, key) =>
          <Address key={key} index={key+1} address={p} />
        )}
      </div>
    )
  }

  render() {
    const {classes, address} = this.props

    const showActions = address.loading === false && address.failure === false

    return (
      <Page title="Addresses">
        <div className={classes.addresses}>
          {this.RenderContent()}
        </div>

        { showActions && <Actions>
          <Button variant="contained" className={classes.purpleButton} component={Link} to={routes.ADDRESS_ADD.path}>
            Add Address
          </Button>
        </Actions>}
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address
})

export default connect(mapStateToProps)(withStyles(styles)(Addresses))