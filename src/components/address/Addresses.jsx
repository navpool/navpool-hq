import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"

import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button/index"
import Actions from "../Actions";

import Address from "./Address";
import NoAddresses from "./NoAddresses";

import {routes} from "../../config/routes";
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
  RenderContent = () => {
    const {address} = this.props

    if (address.data.length === 0) {
      return (<NoAddresses/>)
    }

    return (<div>
        {address.data.map((p, key) =>
          <Address key={key} index={key+1} address={p} />
        )}
      </div>
    )
  }

  render() {
    const {classes} = this.props

    return (
      <Page title="Addresses">
        <div className={classes.addresses}>
          {this.RenderContent()}
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