import React from 'react';
import PropTypes from 'prop-types';
import ordinal from "ordinal-js";
import {withStyles } from "@material-ui/core/styles/index";


const styles = theme => ({
  progress: {
    backgroundColor: '#f9f9f9',
    border: '1px solid rgba(222,214,201,.75)',
    borderRadius: '10px',
    display: 'flex',
    height: '1.25rem',
    overflow: 'hidden',
  },
  votesYes: {
    display: 'flex',
    backgroundColor: '#93c54b',
    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
    backgroundSize: '1rem 1rem',
  },
  votesNo: {
    display: 'flex',
    backgroundColor: '#d9534f',
    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
    backgroundSize: '1rem 1rem',
  },
  votesAbstain: {
    display: 'flex',
    backgroundColor: 'rgba(222,214,201,.75)',
  },
  left: {
    color: '#8e8c84',
    float: 'left',
  },
  right: {
    color: '#8e8c84',
    float: 'right',
  }
});

function ProposalVoteProgress(props) {
  const {classes} = props;
  const {proposal} = props;
  const {blockCycle} = props;

  const votesYes = (proposal.votesYes / blockCycle.blocksInCycle) * 100;
  const votesNo = (proposal.votesNo / blockCycle.blocksInCycle) * 100;
  const votesAbstain = ((blockCycle.currentBlock - proposal.votesYes - proposal.votesNo) / blockCycle.blocksInCycle) * 100;

  return (
    <div>
      <div className={classes.progress}>
        <div className={classes.votesYes} style={{width: votesYes+'%'}} />
        <div className={classes.votesNo} style={{width: votesNo+'%'}} />
        <div className={classes.votesAbstain} style={{width: votesAbstain+'%'}} />
      </div>
      <span className={classes.left}>
        Accept {proposal.votesYes} / Reject {proposal.votesNo}
      </span>
      <span className={classes.right}>
        Cycle {ordinal.toOrdinal(proposal.votingCycle)}
      </span>
    </div>
  );
}

ProposalVoteProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  proposal: PropTypes.object.isRequired,
  blockCycle: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProposalVoteProgress);
