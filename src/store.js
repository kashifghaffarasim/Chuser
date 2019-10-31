import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import axios from 'axios';

console.log('hot modules')
console.log(module.hot)
console.log('hot modules')

const client = axios.create({
    baseURL: 'https://platform.chuser.ru/api/rest/mobile',
    responseType: 'json',
    headers: { 'content-type': 'application/json' },

});

const persistConfig = {
    key: 'roots',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(
    applyMiddleware(axiosMiddleware(client))
));

if (module.hot) {
 // Enable Webpack hot module replacement for reducers
 module.hot.accept('./reducers', () => {
  const nextReducer = require('./reducers').default
  store.replaceReducer(nextReducer)
 })
}

const persistor = persistStore(store);
export { store, persistor }
