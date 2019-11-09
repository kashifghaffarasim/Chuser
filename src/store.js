import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import axios from 'axios';


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


const persistor = persistStore(store);
export { store, persistor }
