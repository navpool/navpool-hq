import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Login from  '../auth/Login';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});

function LoginLayout(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Login />
    </main>
  );
}

LoginLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginLayout);