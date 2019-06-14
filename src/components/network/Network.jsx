import React from 'react'
import Status from "./Status";
import Page from "../Page";

class Network extends React.Component {
  render() {
    return (
      <Page title="Network">
        <Status/>
      </Page>
    )
  }
}

export default Network;