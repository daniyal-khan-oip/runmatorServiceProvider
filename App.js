import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/index';
import {PersistGate} from 'redux-persist/lib/integration/react';
import MainNavigator from './src/screens/MainNavigator';
import SplashScreen from 'react-native-splash-screen';

export default function App() {

  useEffect(()=>{
    SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}
