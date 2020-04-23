import React from 'react';
import {AsyncStorage, View , Platform , I18nManager , Text} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/routes';
import { Root } from "native-base";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import * as Permissions from "expo-permissions";
import { Notifications } from 'expo'
import './ReactotronConfig';




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };

  }

  componentWillMount() {
    I18nManager.forceRTL(true);
    // AsyncStorage.clear();
  }

  async componentDidMount() {

    console.disableYellowBox = true;

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('notify', {
        name: 'Chat messages',
        sound: true,
      });
    }


    await Font.loadAsync({
      sukar             : require('./assets/fonts/Sukar-Regular.ttf'),
      sukarBold         : require('./assets/fonts/Sukar-Bold.ttf'),
      Roboto            : require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium     : require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });

  }

  render() {

    if (!this.state.isReady) {
      return (
          <View />
      );
    }

    return (
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <Root>
              <AppNavigator />
            </Root>
          </PersistGate>
        </Provider>

    );
  }
}



// Keystore password: 9ccd8571588b40bf981c2fa8d361f92a
// Key alias:         QG1fc2hhbXMvY291cnNlcw==
// Key password:      92e17d25f62e4b5a927381e594f6b071
