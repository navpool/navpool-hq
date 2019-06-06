import React from "react";
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";

import Page from "../Page";
import PaymentRequest from "./PaymentRequest";
import Actions from "../Actions";

import {routes} from "../../config/routes";
import {cfundPaymentRequestActions as actions} from "../../actions";
import StatusBar from "../StatusBar";

const styles = (theme) => ({
  paymentRequests: {
    marginTop: theme.spacing.unit * 2,
    maxWidth: '750px',
  },
  update: {
    float: 'right',
    marginTop: '-50px',
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  },
  status: {
    marginBottom: theme.spacing.unit * 2,
  }
})

class CommunityFundProposals extends React.Component {
  state = { votes: [] };

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.dispatch(actions.getPaymentRequests(true))
  }

  handleGoBack = () => {
    const {history} = this.props
    history.push(routes.COMMUNITY_FUND.path)
  }

  handleVoteUpdate = (hash, vote, changed) => {
    const {votes} = this.state

    for (let i = 0; i < votes.length; i++){
      if (votes[i].hash === hash) {
        votes.splice(i, 1);
      }
    }

    if (changed === true) {
      votes.push({hash: hash, type: 'PROPOSAL', vote: vote})
    }
    this.setState({
      votes: votes,
    })
  }

  handleVoteSubmit = () => {
    const {votes} = this.props.paymentRequests

    this.props.dispatch(actions.submitPaymentRequestVotes(votes))
  }

  dirtyVotes = () => {
    const {votes} = this.props.paymentRequests
    if (votes.length === 0) {
      return 0
    }

    return votes.reduce((acc, vote) => vote.dirty === true ? ++acc : acc, 0)
  }

  render() {
    const {classes, paymentRequests, address} = this.props
    const hasAddress = address.data !== null && address.data.length !== 0

    if (!paymentRequests.paymentRequestsLoaded || !paymentRequests.paymentRequestVotesLoaded) {
      return (<div/>)
    }

    return (
      <Page title="Community fund" subtitle="Payment Requests">
        <div className={classes.paymentRequests}>

          {!hasAddress && <StatusBar classes={{root: classes.status}} variant="error" text="You cannot vote for community fund payment requests until you have first added your NavCoin address to your account." />}

          {this.dirtyVotes() !== 0 && <div className={classes.update}>
            <Badge color="secondary" badgeContent={this.dirtyVotes()}>
              <Button className={classes.purpleButton} onClick={this.handleVoteSubmit}>Update Votes</Button>
            </Badge>
          </div>
          }

          {paymentRequests.paymentRequests.map((p, key) =>
            <PaymentRequest key={key} index={key+1} paymentRequest={p} disabled={!hasAddress} onUpdate={this.handleVoteUpdate}/>
          )}
        </div>
        <Actions>
          <Button className={classes.purpleButton} onClick={this.handleGoBack}>Go back</Button>
        </Actions>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  address: state.address,
  paymentRequests: state.cfundPaymentRequest
})

export default connect(mapStateToProps)(withStyles(styles)(CommunityFundProposals));