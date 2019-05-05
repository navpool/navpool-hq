import React, {Component} from 'react'
import axios from "axios";
import {AuthenticationService} from "../services/AuthenticationService";
import AccountPersonalDetails from "../components/account/AccountPersonalDetails";
import AccountSecurity from "../components/account/AccountSecurity";

export default class AccountPage extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    axios.get('http://localhost:8085/account', {
      headers: {"Authorization": `Bearer ${AuthenticationService.getToken()}`}
    })
      .then(res => {
        console.log(res.data)

        this.setState({
          account: res.data,
          loading: false,
        });
      })
      .catch( () => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const {loading, account} = this.state;

    return (
      <div>
        <h1>Account</h1>

        {!loading && <div>
          <h3>{account.username} (User ID: <b>{account.id}</b>)</h3>

          {/*<Notifications*/}

          <AccountPersonalDetails />

          <AccountSecurity account={account} handleStatus={this.handleStatus} />
        </div>}
      </div>
    )
  }
}