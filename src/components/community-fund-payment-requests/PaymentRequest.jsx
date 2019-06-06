import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from '@material-ui/core/styles/withStyles'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Actions from "../Actions";
import VoteButton from "./VoteButton";
import AutoLinkText from "react-autolink-text2/src";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
  },
  content: {
    '& p': {
      marginTop: theme.spacing.unit,
    },
    '& a': {
      wordBreak: 'break-all',
    }
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  },
});

class PaymentRequest extends Component {
  state = { vote: 'ABSTAIN' };

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.setState({
      vote: this.props.vote,
      originalVote: this.props.vote,
    })
  }

  render() {
    const {classes, paymentRequest, disabled} = this.props

    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <AutoLinkText text={paymentRequest.description} linkProps={{target:'_blank', rel:'nofollow'}} />
          <p>{`Requested amount: ${paymentRequest.requestedAmount} Nav`}</p>

          <Actions>
            <VoteButton value="YES" paymentRequest={paymentRequest} disabled={disabled} />
            <VoteButton value="NO" paymentRequest={paymentRequest} disabled={disabled} />
            <VoteButton value="ABSTAIN" paymentRequest={paymentRequest} disabled={disabled} />
          </Actions>
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  paymentRequests: state.cfundPaymentRequest
})

export default connect(mapStateToProps)(withStyles(styles)(PaymentRequest));
