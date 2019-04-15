import React, {Component} from 'react'
import {Switch, Route, BrowserRouter as Router, Link} from "react-router-dom"
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar'
import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer'
import MaterialIcon from '@material/react-material-icon'
import List, {ListItem, ListItemText} from '@material/react-list'

import '@material/react-top-app-bar/dist/top-app-bar.css'
import '@material/react-list/dist/list.css'

import Addresses from '../views/Addresses'
import CommunityFund from '../views/CommunityFund'
import Dashboard from '../views/Dashboard'
import Help from '../views/Help'
import NetworkStats from '../views/NetworkStats'
import Report from '../views/Report'

const routes = [
  {
    path: "/addresses",
    component: Addresses,
  },
  {
    path: "/report",
    component: Report,
  },
  {
    path: "/community-fund",
    component: CommunityFund,
  },
  {
    path: "/stats",
    component: NetworkStats,
  },
  {
    path: "/help",
    component: Help,
  },
  {
    path: "/",
    component: Dashboard
  }
];

export default class Layout extends Component {
  render() {
    return (
      <Router>
      <div className='drawer-container'>
        <Drawer>
          <DrawerHeader>
            <DrawerTitle tag='h2'>
              NavPool HQ
            </DrawerTitle>
          </DrawerHeader>

          <DrawerContent>
            <List>
              <ListItem>
                <Link to="/" className="nav-link"><ListItemText primaryText='Dashboard'/></Link>
              </ListItem>
              <ListItem>
                <Link to="/addresses" className="nav-link"><ListItemText primaryText='Addresses'/></Link>
              </ListItem>
              <ListItem>
                <Link to="/report" className="nav-link"><ListItemText primaryText='Staking report'/></Link>
              </ListItem>
              <ListItem>
                <Link to="/community-fund" className="nav-link"><ListItemText primaryText='Community fund'/></Link>
              </ListItem>
              <ListItem>
                <Link to="/stats" className="nav-link"><ListItemText primaryText='Network stats'/></Link>
              </ListItem>
              <ListItem>
                <Link to="/help" className="nav-link"><ListItemText primaryText='Help &amp; support'/></Link>
              </ListItem>
            </List>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar
            title='Dashboard'
            navigationIcon={<MaterialIcon icon='menu' />}
            fixed
            actionItems={[
              <MaterialIcon icon='face' />,
              <MaterialIcon icon='lock' />,
            ]}
          />

          <TopAppBarFixedAdjust className="content">
              <Switch>
                {routes.map((route, i) => (
                  <Route path={route.path} component={route.component} />
                ))}
              </Switch>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
      </Router>
    );
  }
}