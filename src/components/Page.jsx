import React from "react";
import Heading from "./Heading";

function Page(props) {
  const {children, title, subtitle} = props

  return (
    <div>
      <Heading title={title} subtitle={subtitle} />
      {children}
    </div>
  )
}

export default Page