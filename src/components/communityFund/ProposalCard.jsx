import React from 'react';

import Card, {CardPrimaryContent, CardActions, CardActionButtons} from '@material/react-card';
import Button from '@material-ui/core/Button';

function ProposalCard(props) {
  return (
    <Card className="mdc-card proposal-card">
      <CardPrimaryContent>
        <h2>{props.title}</h2>
        <ul>
          <li className="break-word">
            <a href={"/community-fund/proposal/"+props.hash}>{props.hash}</a>
          </li>
          <li>Nav Requested<span>{props.navRequested} NAV</span></li>
          <li>Duration <span>{props.duration}</span></li>
          <li><i>Voting progress bar</i></li>
          <li>Status <span>{props.status}</span></li>
        </ul>
      </CardPrimaryContent>
      <CardActions class="actions">
        <CardActionButtons>
          <Button size="small" variant="contained" color="primary">Yes</Button>
          <Button size="small" variant="contained" color="secondary">No</Button>
          <Button size="small" variant="contained">Abstain</Button>
        </CardActionButtons>
      </CardActions>
    </Card>
  )
}

export default ProposalCard;