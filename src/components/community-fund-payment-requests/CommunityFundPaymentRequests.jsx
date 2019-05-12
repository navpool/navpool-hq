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
    const {classes, paymentRequests} = this.props

    if (!paymentRequests.paymentRequestsLoaded || !paymentRequests.paymentRequestVotesLoaded) {
      return (<div/>)
    }

    return (
      <Page title="Community fund" subtitle="Payment Requests">
        <div className={classes.paymentRequests}>
          {this.dirtyVotes() !== 0 && <div className={classes.update}>
            <Badge color="secondary" badgeContent={this.dirtyVotes()}>
              <Button className={classes.purpleButton} onClick={this.handleVoteSubmit}>Update Votes</Button>
            </Badge>
          </div>
          }

          {paymentRequests.paymentRequests.map((p, key) =>
            <PaymentRequest key={key} index={key+1} paymentRequest={p} onUpdate={this.handleVoteUpdate}/>
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
  paymentRequests: state.cfundPaymentRequest
})

export default connect(mapStateToProps)(withStyles(styles)(CommunityFundProposals));