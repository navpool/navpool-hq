import {combineReducers} from "redux";

import { account } from './account-reducer';
import { address } from './address-reducer';
import { authentication } from './authentication-reducer';
import { alert } from './alert-reducer';

const rootReducer = combineReducers({
  account,
  address,
  authentication,
  alert
});

export default rootReducer;