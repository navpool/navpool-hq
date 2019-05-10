import React from 'react'

import withStyles from "@material-ui/core/styles/withStyles"
import Panel from "../Panel";

const styles = () => ({

})

function PanelPersonalDetails() {
  return (
    <Panel title="Personal details" subTitle="This is an anonymous staking pool">
      <p>We do not hold any personal details.</p>
    </Panel>
  )
}

export default withStyles(styles)(PanelPersonalDetails)