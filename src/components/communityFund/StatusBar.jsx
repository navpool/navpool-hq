import React from 'react';
import ordinal from "ordinal-js";
import {FormattedNumber, FormattedPlural} from "react-intl"

function StatusBar(props) {
  const { blockCycle } = props;

  return (
    <div className="status status-info">
      Votes counted for block <FormattedNumber value={blockCycle.currentBlock} /> of <FormattedNumber value={blockCycle.blocksInCycle} /> in the {ordinal.toOrdinal(blockCycle.cycle)} block cycle.<br/>
      There <FormattedPlural value={blockCycle.blocksRemaining} one='is' other='are' /> <FormattedNumber value={blockCycle.blocksRemaining} /> <FormattedPlural value={blockCycle.blocksRemaining} one='block' other='blocks' /> remaining.
    </div>
  )
}

export default StatusBar;