import React, {Component} from "react";

import withStyles from '@material-ui/core/styles/withStyles'
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {addressActions as actions} from "../../actions";
import {connect} from "react-redux";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 6,
    textAlign: "center",
    "& h5": {
      color: grey[500],
      marginBottom: theme.spacing.unit * 3,
    }
  },
});

class AddressesFailure extends Component {
  tryAgain = () => {
    this.props.dispatch(actions.getAddresses())
  }

  render() {
    const {classes} = this.props

    return (
      <Paper className={classes.root}>
        <Typography variant={"h5"}>Failed to retrieve address information from the pool.</Typography>
        <Button variant="contained" onClick={this.tryAgain}>Try Again</Button>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(withStyles(styles)(AddressesFailure))
