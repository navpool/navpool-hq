import {Divider} from "@material-ui/core";
import React from "react";

export default function Heading(props) {
  const {title, subtitle} = props

  return (
    <div>
      <h1>{title}</h1>
      <Divider/>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  )
}
