/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {UsuarioController} from './src/controller/Usuario/usuario.controller';
import AppNavigator from './src/navigation/AppNavigator.nav';
import {useAppDispatch} from './src/store/hook/index.hook';
import {setUtilizador} from './src/store/reducer/usuario.reducer';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const controller = new UsuarioController();

  const verifyAuth = async (): Promise<void> => {
    try {
      const response = await controller.verifyIsAuthenticated();
      dispatch(setUtilizador(response));
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
