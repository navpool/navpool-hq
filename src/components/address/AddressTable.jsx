import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import {DialogContent, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ModalDeleteAddress from './ModalDeleteAddress'
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {

  },
  tableEmpty: {
    padding: theme.spacing.unit * 6,
    textAlign: "center",
    "& h5": {
      color: grey[500],
    }
  },
  actions: {
    marginTop: theme.spacing.unit * 4,
  }
});

class AddressTable extends Component {
  state = {
    deleteOpen: false,
  }

  handleOpenDeleteModal(address) {
    this.setState({
      deleteOpen: true,
      deleteAddress: address,
    })
  };

  handleCloseDeleteModal() {
    this.setState({deleteOpen: false})
  }

  render() {
    const { classes, addresses } = this.props
    const {deleteOpen, deleteAddress} = this.state

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Spending Address</TableCell>
                <TableCell>Cold Staking Address</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.length !== 0 && addresses.map((p,k) =>
                <TableRow key={k}>
                  <TableCell>{p.spending_address}</TableCell>
                  <TableCell>{p.cold_staking_address}</TableCell>
                  <TableCell>{p.balance/100000000}&nbsp;Nav</TableCell>
                  <TableCell>
                    <IconButton aria-label="Delete" className={classes.margin} onClick={() => this.handleOpenDeleteModal(p.spending_address)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}

              {addresses.length === 0 && <TableRow>
                <TableCell colSpan={4} className={classes.tableEmpty}>
                  <Typography variant={"h5"}>You do not have any addresses registered to your account.</Typography>
                </TableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </Paper>

        <Modal open={deleteOpen}>
          <DialogContent>
            <ModalDeleteAddress address={deleteAddress} handleClose={() => this.handleCloseDeleteModal()} />
          </DialogContent>
        </Modal>
      </div>
    )
  }
}



export default withStyles(styles)(AddressTable)