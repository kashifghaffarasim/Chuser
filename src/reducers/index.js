import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';

import sessionData from '../features/authentication/reducers';
import invoiceData from '../features/invoices/reducers';
import invitemData from '../features/invoice_items/reducers';

const reducers = {
  sessionData,
  invoiceData,
  invitemData
};

export default asyncInitialState.outerReducer(
    combineReducers({
        ...reducers,
        asyncInitialState: asyncInitialState.innerReducer
    })
);
