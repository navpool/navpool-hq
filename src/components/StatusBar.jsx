import React, {Component} from 'react'

import {withStyles } from "@material-ui/core/styles/index"
import classNames from 'classnames';
import Paper from "@material-ui/core/Paper";
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    color: "#ffffff",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 1.5,
    backgroundColor: "#42b6eb",
  },

  success: {
    backgroundColor: green[400],
  },
  error: {
    backgroundColor: red[400],
  },
  info: {
    backgroundColor: lightBlue[400],
  },
  warning: {
    backgroundColor: orange[400],
  },

  list: {
    margin: 0,
    padding: "0 0 0 25px",
  }
})

class StatusBar extends Component {
  state = {
    open: false,
  }

  onClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    const { classes, title, text, list, variant, closeable} = this.props;

    return (
      <Paper className={classNames(classes.root, classes[variant])}>
        {title && <h3>{title}</h3>}
        {text && <p>{text}</p>}
        {list &&
        <ul className={classes.list}>
          {Object.keys(list).map((key, index) =>
            <li key={index}>{list[key]}</li>
          )}
        </ul>
        }

        {closeable && <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={this.onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>}
      </Paper>
    )
  }
}

export default withStyles(styles)(StatusBar)