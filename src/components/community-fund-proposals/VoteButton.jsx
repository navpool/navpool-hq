import React, {Component} from "react";
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {alertActions, cfundProposalActions as actions} from "../../actions";

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
  getProposalVote() {
    const {proposal, proposals} = this.props

    let index = proposals.votes.findIndex(vote => vote.hash === proposal.hash);
    if (index === -1) {
      return null
    }

    return proposals.votes[index];
  }

  updateVote = newVote => {
    const {proposal, proposals} = this.props
    let vote = this.getProposalVote();

    if (typeof vote == 'undefined') {
      vote = {
        vote: newVote,
        type: 'PROPOSAL',
        hash: proposal.hash,
      }
      proposals.votes.push(vote)
      this.updateVote(newVote)
      return
    }

    if (typeof vote.originalVote == 'undefined') {
      vote.originalVote = vote.vote;
    }

    vote.dirty = newVote !== vote.originalVote;
    vote.vote = newVote;

    this.props.dispatch(alertActions.clear())
    this.props.dispatch(actions.updateProposalVotes(proposals.votes))
  }

  render() {
    const {classes, proposals, value, disabled} = this.props

    if (typeof proposals === 'undefined') {
      return (<div />)
    }

    const vote = this.getProposalVote()

    if (vote === null) {
      return (<Button disabled={disabled} variant="outlined" onClick={() => this.updateVote(value)}>{value}</Button>)
    }

    if (vote.vote === value) {
      return (<Button disabled={disabled} className={classes.purpleButton} onClick={() => this.updateVote(value)}>{value}</Button>)
    }

    if (vote.originalVote === value) {
      return (<Button disabled={disabled} className={classes.purpleOutlineButton} onClick={() => this.updateVote(value)}>{value}</Button>)
    }

    return (<Button disabled={disabled} variant="outlined" onClick={() => this.updateVote(value)}>{value}</Button>)
  }
}

const mapStateToProps = state => ({
  proposals: state.cfundProposal
})

export default connect(mapStateToProps)(withStyles(styles)(VoteButton));