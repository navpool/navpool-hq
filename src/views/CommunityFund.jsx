import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';

import StatusBar from '../components/communityFund/StatusBar';
import ProposalCard from '../components/communityFund/ProposalCard';

const styles = theme => ({

});

class CommunityFund extends Component {
  state = {
    spacing: 32,
    blockCycle: {
      currentBlock: 0,
      blocksInCycle: 0,
      cycle: 1,
      blocksRemaining: 0,
    },
    proposals: [],
  };

  componentDidMount() {
    axios.get('https://api.navexplorer.com/api/community-fund/block-cycle')
      .then(res => {
        this.setState({
          blockCycle: res.data
        });
      });

    axios.get('https://api.navexplorer.com/api/community-fund/proposal?state=pending')
      .then(res => {
        this.setState({
          proposals: res.data
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    const { blockCycle } = this.state;

    return (
      <div>
        <h1>Community Fund</h1>
        <StatusBar blockCycle={blockCycle} />

        <h2>Pending Proposals</h2>
        <p>The following proposals are current open for voting:</p>

        <Grid container spacing={spacing}>
          {this.state.proposals.map((p,k) =>
            <Grid key={k} item xs={12} sm={12} md={6} lg={4} className={classes.section}>
              <Paper elevation={1} >
                <ProposalCard proposal={p} blockCycle={blockCycle}/>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    )
  }
}

CommunityFund.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CommunityFund);