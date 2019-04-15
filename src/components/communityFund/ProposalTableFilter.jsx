import React from 'react';
import Button from '@material-ui/core/Button';

function ProposalTableFilter() {
  return (
    <div className="tableFilter">
      <ul>
        <li><Button disabled>Pending</Button></li>
        <li><Button>Accepted</Button></li>
        <li><Button>Rejected</Button></li>
        <li><Button>Expired</Button></li>
        <li><Button>Pending Funds</Button></li>
      </ul>
    </div>
  )
}

export default ProposalTableFilter;