import React, {Component} from "react";
import {Link} from 'react-router-dom'
import classnames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {navFormat} from "../../helpers";
import Divider from "@material-ui/core/Divider";
import {routes, path} from "../../config/routes";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
    textAlign: 'right',
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
    paddingTop: 0,
    paddingBottom: '8px !important',
  },
  contentBlock: {
    paddingBottom: theme.spacing.unit * 2,
    '& h4': {
      paddingTop: theme.spacing.unit,
    },
    '& p': {
      paddingBottom: theme.spacing.unit / 2,
    },
    '& a': {
      wordBreak: 'break-all',
    },
    '& button, a': {
      marginTop: theme.spacing.unit,
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

class Address extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  openInExplorer = () => {
    const {address} = this.props

    const url = "https://www.navexplorer.com/address/"+address.spending_address
    window.open(url, "_blank")
  }

  render() {
    const {classes, address} = this.props

    return (
      <Card className={classes.root}>
        <CardHeader className={classes.header} classes={{ avatar: classes.avatar }}
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
            <Divider/>
            <div className={classes.contentBlock}>
              <h4>Deposit Nav</h4>
              <p>Send NavCoin to the following address to deposit in your pool account.</p>
              <p><a href="navcoin://{address.cold_staking_address}">{address.cold_staking_address}</a></p>
            </div>

            {/*<Divider/>*/}
            {/*<div className={classes.contentBlock}>*/}
            {/*  <h4>View on the explorer</h4>*/}
            {/*  <p>You can review your staking transactions on NavExplorer</p>*/}
            {/*  <div className={classes.actions}>*/}
            {/*    <Button onClick={this.openInExplorer} variant="contained" className={classes.purpleButton}>View transactions</Button>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <Divider/>
            <div className={classes.contentBlock}>
              <h4>Remove address</h4>
              <p>Once removed, any funds that remain in the account will no longer be staked. Use the spending address</p>
              <div className={classes.actions}>
                <Button variant="contained"
                        color="secondary"
                        component={Link}
                        to={path(routes.ADDRESS_REMOVE, {id: address.id})}
                >Remove address</Button>
              </div>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default withStyles(styles)(Address)
