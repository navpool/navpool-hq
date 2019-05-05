import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import CircularProgress from '@material-ui/core/CircularProgress'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import withStyles from "@material-ui/core/styles/withStyles"

const styles = theme => ({
  snackbar: {
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.error.dark,
  },
  actions: {
    marginTop: theme.spacing.unit * 4
  },
  purple: {
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    username: PropTypes.string,
  };

  state = {
    username: '',
    password: '',
    twoFactor: '',
  }

  reset() {
    this.setState({
      username: '',
      password: '',
      twoFactor: '',
    })
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({ [field]: value })
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.state, () => this.reset())
  }

  render() {
    const { username, password, twoFactor } = this.state;
    const { classes, isFetching, isError } = this.props;

    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        { isError && <SnackbarContent className={classes.snackbar} message="Username, password or 2FA incorrect" /> }

        <TextValidator
          fullWidth
          label="Username"
          onChange={this.handleChange}
          name="username"
          autoComplete={"off"}
          value={username}
          validators={['required']}
          errorMessages={['this field is required']}
          margin="normal"
        />
        <TextValidator
          fullWidth
          label="Password"
          type='password'
          onChange={this.handleChange}
          name="password"
          autoComplete={"off"}
          value={password}
          validators={['required']}
          errorMessages={['this field is required']}
          margin="normal"
        />

        <TextValidator
          fullWidth
          label="Two factor authentication"
          onChange={this.handleChange}
          name="twoFactor"
          autoComplete={"off"}
          value={twoFactor}
          margin="normal"
        />

        <div className={classes.actions}>
          <Button variant="contained" fullWidth color="primary" type="submit" disabled={isFetching} margin="normal" className={classes.purple}>
            {isFetching && <CircularProgress size={20} />} Login
          </Button>
        </div>
      </ValidatorForm>
    )
  }
}

export default withStyles(styles)(LoginForm)