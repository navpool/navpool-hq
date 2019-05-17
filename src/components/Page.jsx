import React from "react";
import Heading from "./Heading";
import StatusBar from "./StatusBar";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

function Page(props) {
  const {alert, children, title, subtitle} = props

  return (
    <div>
      <Heading title={title} subtitle={subtitle} />
      {alert.message && <StatusBar variant={alert.type} text={alert.message} />}
      {children}
    </div>
  )
}

const mapStateToProps = state => ({
  alert: state.alert,
})

export default withRouter(connect(mapStateToProps)(Page));

