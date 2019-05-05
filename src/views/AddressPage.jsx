import React, {Component} from 'react'
import AddressTable from '../components/address/AddressTable'
import {AuthenticationService} from "../services/AuthenticationService";
import axios from "axios";
import AddressAdd from "../components/address/AddressAdd";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  actions: {
    marginTop: theme.spacing.unit * 4,
  },
  purple: {
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class AddressPage extends Component {
  state = {
    addresses: [],
    loading: true,
    loadFailed: false,
    addAddressOpen: false,
  }

  componentDidMount() {
    this.loadAddresses()
  }

  handleOpenAddAddress = () => {
    this.setState({
      addAddressOpen: true,
    })
  }

  handleCloseAddAddress = () => {
    this.setState({
      addAddressOpen: false,
    })
  }

  loadAddresses() {
    this.setState({
      loading: true,
    })

    axios.get('http://localhost:8085/address', {
      headers: {"Authorization": `Bearer ${AuthenticationService.getToken()}`}
    })
      .then(res => {
        this.setState({
          addresses: res.data,
          loading: false,
        });
        this.handleCloseAddAddress();
      })
      .catch( () => {
        this.setState({
          loading: false,
        })
      })
  }

  renderList = () => (
    <div>
      <AddressTable addresses={this.state.addresses} />

      <div className={this.props.classes.actions}>
        <Button variant="contained" color="primary" onClick={this.handleOpenAddAddress} className={this.props.classes.purple}>
          Add Address
        </Button>
      </div>
    </div>
  )

  renderAddAddress = () => (
    <AddressAdd onSuccess={() => this.loadAddresses()} onCancel={() => this.handleCloseAddAddress()} />
  )

  render() {
    const {loading, addAddressOpen} = this.state
    const renderAddAddress = this.renderAddAddress()
    const renderList = this.renderList()

    return (
      <div>
        <h1>Addresses</h1>
        { loading ? <div/> : addAddressOpen ? renderAddAddress : renderList }
      </div>
    )
  }
}

export default withStyles(styles)(AddressPage)