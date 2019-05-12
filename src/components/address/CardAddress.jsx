import React, {Component} from "react";
import classnames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import Actions from "../Actions";
import Button from "@material-ui/core/Button";
import {navFormat} from "../../helpers";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginTop: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: theme.spacing.unit,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    display: 'none',
  },
  content: {
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
  }
});

class CardAddress extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const {classes, address} = this.props

    return (
      <Card className={classes.root}>
        <CardHeader className={classes.cardHeader} classes={{ avatar: classes.avatar }}
                    avatar={<span/>}
                    action={
                      <IconButton className={classnames(classes.expand, {[classes.expandOpen]: this.state.expanded})} onClick={this.handleExpandClick} aria-expanded={this.state.expanded} aria-label="Show more">
                        <ExpandMoreIcon />
                      </IconButton>
                    }
                    title={address.spending_address}
                    subheader={`Pool balance: ${navFormat(address.balance)} Nav`}
        />

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.content}>
            {address.balance === 0
              ? <p>To stake with this address send NavCoin to the following cold staking address:</p>
              : <p>To add more NavCoin to your pool balance send NavCoin following cold staking address:</p>
            }

            <p><a href="navcoin://">{address.cold_staking_address}</a></p>

            <Actions>
              <Button variant="contained" className={classes.purpleButton} size="small">Verify</Button>
              <Button variant="contained" color="secondary" size="small">Remove</Button>
            </Actions>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default withStyles(styles)(CardAddress)
