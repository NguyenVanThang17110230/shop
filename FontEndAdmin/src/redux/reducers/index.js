import { combineReducers } from 'redux';

import user from './user';
import product from './product';
import stateImportProductGood from './importGood'
import urlBackend from './urlBackend'
const appReducers = combineReducers({
    user: user,
    product: product,
    stateImportProductGood: stateImportProductGood,
    urlBackend: urlBackend,
});

export default appReducers;