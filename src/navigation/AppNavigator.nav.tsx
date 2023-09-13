import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../store/hook/index.hook';
import AuthStack from './AuthStack/AuthStack.nav';
import MainStack from './MainStack/MainStack.nav';

const AppNavigator: React.FC = (): React.JSX.Element => {
  const isAuthenticated = !!useAppSelector(state => state.usuario.utilizador);
  const data = useAppSelector(state => state.usuario.utilizador);
  useEffect(() => {}, [isAuthenticated]);
  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
