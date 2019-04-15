import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ProposalCard from './ProposalCard';

let id = 0;
function createData(description, navRequested, status, vote) {
  id += 1;
  return { id, description, navRequested, status, vote };
}

const rows = [
  createData('Frozen yoghurt', 50000, "PENDING", -1),
];

class ProposalTable extends Component {
  render() {
    return (
      <div>
        <ProposalCard />
      </div>
    )
  }
}

export default ProposalTable;