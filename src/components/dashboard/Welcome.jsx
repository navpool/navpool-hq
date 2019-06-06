import React from 'react'
import Panel from "../Panel";

class Welcome extends React.Component {
  render() {

    return (
      <Panel title="Welcome to NavPool">
        <p>NavPool is the first non custodial staking pool for NavCoin.<br/>
        We are proud to be fully funded by the NavCoin <a href="https://navcoin.org/en/community-fund/" target="_blank" rel="noopener noreferrer">Community Fund</a>.</p>

        <p>
          Contact us if require assistance setting up your account or have any feature requests you would like to see
          included. You will find support using NavPool on the <a href="https://discord.gg/5C2hSK" target="_blank" rel="noopener noreferrer">NavCoin discord server</a>.
        </p>

        <p className="last">Happy Staking!</p>
      </Panel>
    )
  }
}

export default Welcome;