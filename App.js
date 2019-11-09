import React from 'react';
import { View, Text, NativeModules }from 'react-native';

import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store';

import Decider from './src/decider';

const App: () => React$Node = () => {

  return (
        <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
              <Decider />
          </PersistGate>

       </Provider>
  );
};

export default App;
