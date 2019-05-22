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
  title: {
    wordBreak: 'break-all',
  },
  cardHeader: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  },
});

class Proposal extends Component {
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
    const {classes, proposal} = this.props

    return (
      <Card className={classes.root}>
        <CardHeader className={classes.cardHeader} classes={{ avatar: classes.avatar, title: classes.title }}
                    avatar={<span/>}
                    action={<span/>}
                    title={proposal.description}
                    subheader={`Requested amount: ${proposal.requestedAmount} Nav`}
        />
        <CardContent className={classes.content}>
          <Actions>
            <VoteButton value="YES" proposal={proposal} />
            <VoteButton value="NO" proposal={proposal} />
            <VoteButton value="ABSTAIN" proposal={proposal} />
          </Actions>
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  proposals: state.cfundProposal
})

export default connect(mapStateToProps)(withStyles(styles)(Proposal));
