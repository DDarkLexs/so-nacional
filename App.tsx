/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from './src/@types/redux/hook/index.hook';
import {UsuarioController} from './src/controller/Usuario/usuario.controller';
import AppNavigator from './src/navigation/AppNavigator.nav';
import {setUtilizador} from './src/store/reducer/usuario.reducer';
import {showToast} from './src/service/toast.service';
import SplashScreen from './src/screens/Informacao/Welcome/SplashScreen.screen';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const controller = new UsuarioController();

  const verifyAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await controller.verifyIsAuthenticated();
      dispatch(setUtilizador(response));
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // showToasts()
    verifyAuth();
  }, []);
  const theme = useTheme();
  return (
    <>
      <StatusBar  backgroundColor={theme.colors.outlineVariant} />
      {loading ? (
        <>
          <SplashScreen />
        </>
      ) : (
        <SafeAreaView style={styles.container}>
          <AppNavigator />
          <Toast />
        </SafeAreaView>
      )}
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
