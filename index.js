/**
 * @format
 */
import 'reflect-metadata';
import {AppRegistry, useColorScheme} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import {dark, light} from './src/assets/styles/default.styles.ts';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/store/index.store';

export default function Main() {
  const theme = useColorScheme() === 'light' ? light : dark;
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
