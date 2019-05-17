import React from "react";

import Page from "../Page";
import Panel from "../Panel";
import Button from "@material-ui/core/Button";
import Actions from "../Actions";
import {Link} from "react-router-dom";
import {routes} from "../../config/routes";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {cfundProposalActions, cfundPaymentRequestActions} from "../../actions";
import {connect} from "react-redux";

const styles = () => ({
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class CommunityFund extends React.Component {
  componentDidMount() {
    this.props.dispatch(cfundProposalActions.getProposals(false))
    this.props.dispatch(cfundPaymentRequestActions.getPaymentRequests(false))
  }

  render() {
    const {classes, proposals, paymentRequests} = this.props

    if (!proposals.proposalsLoaded && !paymentRequests.paymentRequestsLoaded) {
      return (<div/>)
    }

    return (
      <Page title="Community fund">
        <Panel title="Proposals">
          <p>NavPool stakers are able to vote for NavCoin community fund proposals.</p>
          <p>There are {proposals.proposals.length} proposals open for voting.</p>
          <Actions>
            <Button variant="contained" component={Link} to={routes.COMMUNITY_FUND_PROPOSALS.path} className={classes.purpleButton}>View proposals</Button>
          </Actions>
        </Panel>

        <Panel title="Payment requests">
          <p>Once a proposal has been accepted the proposal owner is able to request payment.</p>
          <p>There are {paymentRequests.paymentRequests.length} payment requests open for voting.</p>
          <Actions>
            <Button variant="contained" component={Link} to={routes.COMMUNITY_FUND_PAYMENT_REQUESTS.path} className={classes.purpleButton}>View payment requests</Button>
          </Actions>
        </Panel>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  proposals: state.cfundProposal,
  paymentRequests: state.cfundPaymentRequest,
})

export default connect(mapStateToProps)(withStyles(styles)(CommunityFund));