import React, {Component} from "react";
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {cfundPaymentRequestActions as actions} from "../../actions";

const styles = () => ({
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
    padding: '5px 16px',
  },
  purpleOutlineButton: {
    color: '#ffffff',
    border: '1px solid #7d5ab5',
    backgroundColor: 'rgba(125, 90, 181, 0.5)',
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
    padding: '5px 16px',
  }
})

class VoteButton extends Component {
  getPaymentRequestVote() {
    const {paymentRequest, paymentRequests} = this.props

    if (paymentRequests.votes.length === 0) {
      return null;
    }

    let index = paymentRequests.votes.findIndex(vote => vote.hash === paymentRequest.hash);
    if (index === -1) {
      return null
    }

    return paymentRequests.votes[index];
  }

  updateVote = newVote => {
    const {paymentRequest, paymentRequests} = this.props
    let vote = this.getPaymentRequestVote();

    if (typeof vote == 'undefined' || vote === null) {
      vote = {
        vote: newVote,
        type: 'PAYMENT_REQUEST',
        hash: paymentRequest.hash,
      }

      paymentRequests.votes.push(vote)
      this.updateVote(newVote)
      return
    }

    if (typeof vote.originalVote == 'undefined') {
      vote.originalVote = vote.vote;
    }

    vote.dirty = newVote !== vote.originalVote;
    vote.vote = newVote;

    this.props.dispatch(actions.updatePaymentRequestVotes(paymentRequests.votes))
  }

  render() {
    const {classes, paymentRequests, value} = this.props

    if (typeof paymentRequests === 'undefined') {
      return (<div />)
    }

    const vote = this.getPaymentRequestVote()
    if (vote === null) {
      return (<Button variant="outlined" onClick={() => this.updateVote(value)}>{value}</Button>)
    }

    if (vote.vote === value) {
      return (<Button className={classes.purpleButton} onClick={() => this.updateVote(value)}>{value}</Button>)
    }

    if (vote.originalVote === value) {
      return (<Button className={classes.purpleOutlineButton} onClick={() => this.updateVote(value)}>{value}</Button>)
    }

    return (<Button variant="outlined" onClick={() => this.updateVote(value)}>{value}</Button>)
  }
}

const mapStateToProps = state => ({
  paymentRequests: state.cfundPaymentRequest
})

export default connect(mapStateToProps)(withStyles(styles)(VoteButton));