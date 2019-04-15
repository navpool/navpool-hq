import React, {Component} from 'react';

import StatusBar from '../components/communityFund/StatusBar';
import ProposalCard from '../components/communityFund/ProposalCard';

class CommunityFund extends Component {
  render() {
    return (
      <div>
        <StatusBar level="info" />

        <h1>Proposals</h1>

        <ProposalCard
          title="Airdrop giveaway on Nova exchange"
          hash="56cafcf5c0e8b9f9155a055471806204ad8c175f79681a4789c554994c4d094c"
          navRequested="3,500"
          navPaid="500"
          duration="1 week"
          status="Pending"
        />

        <ProposalCard
          title="Navcoin marketing campaign portuguese"
          hash="56cafcf5c0e8b9f9155a055471806204ad8c175f79681a4789c554994c4d094c"
          navRequested="3,500"
          navPaid="500"
          duration="1 week"
          status="Pending"
        />

        <ProposalCard
          title="Funding to issue fcas rating for navcoin as seen on coinmarketcap "
          hash="56cafcf5c0e8b9f9155a055471806204ad8c175f79681a4789c554994c4d094c"
          navRequested="3,500"
          navPaid="500"
          duration="1 week"
          status="Pending"
        />
      </div>
    )
  }
}

export default CommunityFund;