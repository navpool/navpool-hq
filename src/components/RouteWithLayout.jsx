import React from 'react'
import {Redirect, Route} from "react-router-dom"

export function RouteWithLayout({layout, component, secure, ...rest}) {
  return (
    secure && !localStorage.getItem('user')
      ? <Redirect to={{ pathname: '/login' }} />
      : <Route {...rest} render={(props) =>
        React.createElement(layout, props, React.createElement(component, props))
      }/>
  )
}
