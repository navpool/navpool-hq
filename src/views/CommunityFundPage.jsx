import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import StatusBar from '../components/communityFund/StatusBar'
import ProposalCard from '../components/communityFund/ProposalCard'

const styles = () => ({
  progress: {
    position: 'fixed',
    top: '64px',
    left: 0,
    width: '100%',
    zIndex: 2000,
    colorPrimary: {
      'backgroundColor': '#ff0000'
    },
    colorSecondary: '#ffff00',
  }
})

class CommunityFundPage extends Component {
  state = {
    spacing: 32,
    blockCycle: {
      currentBlock: 0,
      blocksInCycle: 0,
      cycle: 1,
      blocksRemaining: 0,
    },
    proposals: [],
  }

  componentDidMount() {
    axios.get('https://api.navexplorer.com/api/community-fund/block-cycle')
      .then(res => {
        this.setState({
          blockCycle: res.data,
        });
      })
      .catch({
        //error msg
      })

    axios.get('https://api.navexplorer.com/api/community-fund/proposal?state=pending')
      .then(res => {
        this.setState({
          proposals: res.data
        })
      })
  }

  render() {
    const { spacing, blockCycle, proposals } = this.state

    return (
      <div>
        <h1>Community Fund</h1>
        <StatusBar blockCycle={blockCycle} />

        <div>
          <h2>Pending Proposals</h2>
          <p>The following proposals are open for voting:</p>

          <Grid container spacing={spacing}>
            {proposals.map((p,k) =>
              <Grid key={k} item xs={12} sm={12} md={6} lg={4}>
                <Paper elevation={2}>
                  <ProposalCard proposal={p} blockCycle={blockCycle}/>
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    )
  }
}

CommunityFundPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CommunityFundPage)
