import React from 'react'
import { connect } from 'react-redux'
import Heading from "./Heading";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Heading title="Dashboard" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication
})


export default connect(mapStateToProps)(Dashboard);