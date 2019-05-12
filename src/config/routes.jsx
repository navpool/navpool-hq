import React from 'react'

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';

import Dashboard from '../components/Dashboard'
import Account from '../components/account/Account'
import AccountSecurity from "../components/account-security/AccountSecurity";
import Address from '../components/address/Addresses'
import AddressAdd from '../components/address-add/AddressAdd'
import AddressRemove from "../components/address-remove/AddressRemove";
import CommunityFund from "../components/community-fund/CommunityFund";
import Login from "../components/authentication/Login";
import MainLayout from "../components/layouts/MainLayout";
import LoginLayout from "../components/layouts/LoginLayout";
import CommunityFundProposals from "../components/community-fund-proposals/CommunityFundProposals";
import CommunityFundPaymentRequests from "../components/community-fund-payment-requests/CommunityFundPaymentRequests";

export const routes = {
  HOMEPAGE: {
    component: Dashboard,
    path: "/",
    layout: MainLayout,
    secure: true,
    name: "Dashboard",
    icon: <HomeIcon/>,
  },
  ACCOUNT: {
    component: Account,
    path: "/account",
    name: "Account",
    layout: MainLayout,
    secure: true,
    icon: <AccountCircleIcon />,
  },
  ACCOUNT_SECURITY: {
    component: AccountSecurity,
    path: "/account/security",
    layout: MainLayout,
    secure: true,
  },
  ADDRESS: {
    component: Address,
    path: "/addresses",
    layout: MainLayout,
    secure: true,
    name: "Addresses",
    icon: <LocationOnIcon/>,
  },
  ADDRESS_ADD: {
    component: AddressAdd,
    path: "/addresses/add",
    layout: MainLayout,
    secure: true,
  },
  ADDRESS_REMOVE: {
    component: AddressRemove,
    path: "/addresses/remove",
    layout: MainLayout,
    secure: true,
  },
  COMMUNITY_FUND: {
    component: CommunityFund,
    path: "/community-fund",
    layout: MainLayout,
    secure: true,
    name: "Community Fund",
    icon: <PeopleIcon />,
  },
  COMMUNITY_FUND_PROPOSALS: {
    component: CommunityFundProposals,
    path: "/community-fund/proposals",
    layout: MainLayout,
    secure: true,
  },
  COMMUNITY_FUND_PAYMENT_REQUESTS: {
    component: CommunityFundPaymentRequests,
    path: "/community-fund/payment-requests",
    layout: MainLayout,
    secure: true,
  },
  LOGIN: {
    component: Login,
    path: "/login",
    layout: LoginLayout,
    secure: false,
  },
  // {
  //   name: "Network Stats",
  //   path: "/network",
  //   component: NetworkStatsPage,
  //   icon: <BarChartIcon />
  // },
  // {
  //   name: "Help & Support",
  //   path: "/help",
  //   component: HelpPage,
  //   icon: <HelpIcon />,
  // },
};