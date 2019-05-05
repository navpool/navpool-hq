import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import CircularProgress from '@material-ui/core/CircularProgress'
import withStyles from "@material-ui/core/styles/withStyles"
import StatusBar from "../StatusBar";

const styles = theme => ({
  actions: {
    textAlign: "right",
    marginTop: theme.spacing.unit * 4,
    "& button": {
      marginLeft: theme.spacing.unit * 2,
    }
  },
  purpleButton: {
    color: '#ffffff',
    backgroundColor: "#7d5ab5",
    '&:hover': {
      backgroundColor: "#5d3f8d",
    },
  }
})

class AddressAddForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
  }

  state = {
    hash: '',
    signature: '',
  }

  reset() {
    this.setState({
      hash: '',
      signature: '',
    })
  }

  handleChange = (event) => {
    const value = event.target.value
    const field = event.target.name

    this.setState({ [field]: value })
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.state, () => this.reset())
  }

  handleCancel = () => {
    this.props.handleCancel()
  }

  render() {
    const { hash, signature } = this.state
    const { classes, isFetching, isError, errors } = this.props

    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        { isError && <StatusBar text="Unable to add the address" list={errors} variant="error" /> }

        <TextValidator
          fullWidth
          label="Address hash"
          onChange={this.handleChange}
          name="hash"
          autoComplete={"off"}
          value={hash}
          validators={['required']}
          errorMessages={['This field is required']}
          margin="normal"
        />

        <TextValidator
          fullWidth
          label="Verification signature"
          onChange={this.handleChange}
          name="signature"
          autoComplete={"off"}
          value={signature}
          validators={['required']}
          errorMessages={['This field is required']}
          margin="normal"
        />

        <div className={classes.actions}>
          <Button variant="contained" color="secondary" onClick={this.handleCancel}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={isFetching} className={classes.purpleButton}>
            {isFetching && <CircularProgress size={20} />} Add Address
          </Button>
        </div>
      </ValidatorForm>
    )
  }
}

export default withStyles(styles)(AddressAddForm)