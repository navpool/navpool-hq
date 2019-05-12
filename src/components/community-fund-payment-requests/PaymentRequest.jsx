import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from '@material-ui/core/styles/withStyles'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Actions from "../Actions";
import VoteButton from "./VoteButton";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    display: 'none',
  },
  cardHeader: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
    '& p': {
      paddingBottom: theme.spacing.unit / 2,
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
  }

  componentDidMount() {
    this.setState({
      vote: this.props.vote,
      originalVote: this.props.vote,
    })
  }

  render() {
    const {classes, paymentRequest} = this.props

    return (
      <Card className={classes.root}>
        <CardHeader className={classes.cardHeader} classes={{ avatar: classes.avatar }}
                    avatar={<span/>}
                    action={<span/>}
                    title={paymentRequest.description}
                    subheader={`Requested amount: ${paymentRequest.requestedAmount} Nav`}
        />
        <CardContent className={classes.content}>
          <Actions>
            <VoteButton value="YES" paymentRequest={paymentRequest} />
            <VoteButton value="NO" paymentRequest={paymentRequest} />
            <VoteButton value="ABSTAIN" paymentRequest={paymentRequest} />
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
