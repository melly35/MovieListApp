import React, {useRef, useState, useEffect} from 'react';
import {Text, View, StatusBar, SafeAreaView, StyleSheet} from 'react-native';

import {Provider, useSelector, useDispatch} from 'react-redux';
import {store, persistor} from './src/redux/store';

import RootNav from './src/navigation/index';

import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <RootNav />
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaBody: {
    flex: 1,
    backgroundColor: '#181A32',
  },
});

export default App;
