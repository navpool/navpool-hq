import React from 'react'
import PropTypes from 'prop-types'
import humanizeDuration from 'humanize-duration'
import Card, {CardPrimaryContent, CardActions, CardActionButtons} from '@material/react-card'
import Button from '@material-ui/core/Button'
import {withStyles } from "@material-ui/core/styles/index"
import ProposalVoteProgress from "./ProposalVoteProgress"

const styles = () => ({
  card: {
    marginTop: '20px',
  },
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: 0,
    backgroundColor: 'rgba(248,245,240,0.25)',
    borderBottom: '1px solid rgba(223,215,202,0.75)',
    "& h3": {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      boxOrient: 'vertical',
      lineClamp: 3,
      lineHeight: '1.2',
      height: '3.6em'
    },

  },
  list: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    "& li": {
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
      padding: '0.75rem 1.25rem',
      backgroundColor: '#fff',
      borderTop: '1px solid #dfd7ca',
    },
    "& li:first-child": {
      borderTop: 0,
    },
  },
  right: {
    float: 'right',
  },
  actions: {
    padding: '0.75rem 1.25rem',
    backgroundColor: 'rgba(248,245,240,0.25)',
    borderTop: '1px solid #dfd7ca',
  },
  buttons: {
    textAlign: 'center',
    '& button': {
      margin: '10px',
    }
  }
})

function ProposalCard(props) {
  const { classes, proposal, blockCycle } = props;

  return (
    <Card className={classes.card}>
      <CardPrimaryContent>
        <div className={classes.cardHeader}>
          <h3>{proposal.description}</h3>
        </div>

        <ul className={classes.list}>
          <li>
            <a href={"/community-fund/proposal/"+proposal.hash} className="break-word">{proposal.hash}</a>
          </li>
          <li>Nav Requested<span className={classes.right}>{proposal.requestedAmount} NAV</span></li>
          <li>Duration <span className={classes.right}>{humanizeDuration(proposal.proposalDuration * 1000, { largest: 2 })}</span></li>
          <li><ProposalVoteProgress proposal={proposal} blockCycle={blockCycle} /></li>
          <li>Status <span className={classes.right}>{proposal.status}</span></li>
        </ul>
      </CardPrimaryContent>

      <CardActions className={classes.actions}>
        <CardActionButtons className={classes.buttons}>
          <Button size="small" variant="contained" color="primary">Yes</Button>
          <Button size="small" variant="contained" color="secondary">No</Button>
          <Button size="small" variant="contained">Abstain</Button>
        </CardActionButtons>
      </CardActions>
    </Card>
  )
}

ProposalCard.propTypes = {
  classes: PropTypes.object.isRequired,
  proposal: PropTypes.object.isRequired,
}


export default withStyles(styles)(ProposalCard)
