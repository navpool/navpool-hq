import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {navFormat} from "../helpers";

const styles = () => ({

})

function NavFormat(props) {
  const {satoshi} = props

  return (
    <span>
      {navFormat(satoshi)} Nav
    </span>
  )
}

export default withStyles(styles)(NavFormat)