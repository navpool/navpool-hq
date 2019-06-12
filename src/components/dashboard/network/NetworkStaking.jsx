import {Divider} from "@material-ui/core";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";

const styles = () => ({
  root: {
    textAlign: "center",
  },
  avatarOn: {
    margin: "30px auto",
    width: '80px',
    height: '80px',
    fontSize: '2rem',
    background: 'green',
  },
  avatarOff: {
    margin: " 20px auto",
    width: '100px',
    height: '100px',
    fontSize: '2rem',
    background: 'red',
  },
  error: {
    marginTop: '20px',
    fontSize: '2rem',
  }
})

function NetworkStaking(props) {
  const {classes, staking} = props

  return (
    <div className={classes.root}>
      <h3>Status</h3>
      <Divider/>
      { staking === null ? <div className={classes.error}>--</div> : <div>
        { staking === true ? <Avatar className={classes.avatarOn}>On</Avatar> : <Avatar className={classes.avatarOff}>Off</Avatar>}
      </div>}
    </div>
  )
}

export default withStyles(styles)(NetworkStaking)
