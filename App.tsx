/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator.nav';
import {useTheme} from 'react-native-paper';
import {setIsAuthenticated} from './src/store/reducer/usuario.reducer';
import {UsuarioController} from './src/controller/Usuario/usuario.controller';
import {useAppDispatch} from './src/store/hook/index.hook';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const controller = new UsuarioController();

  const verifyAuth = async (): Promise<void> => {
    try {
      const response = await controller.verifyIsAuthenticated();
      dispatch(setIsAuthenticated(!!response));
    } catch (error) {}
  };
  useEffect(() => {
    verifyAuth();
  }, []);
  const theme = useTheme();
  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
