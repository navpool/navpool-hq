import {combineReducers} from "redux";

import { account } from './account-reducer';
import { address } from './address-reducer';
import { authentication } from './authentication-reducer';
import { alert } from './alert-reducer';
import { cfundPaymentRequest } from './cfund-payment-request-reducer';
import { cfundProposal } from './cfund-proposal-reducer';

const rootReducer = combineReducers({
  account,
  address,
  authentication,
  alert,
  cfundPaymentRequest,
  cfundProposal,
});

export default rootReducer;