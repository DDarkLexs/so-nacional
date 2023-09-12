import React, {useState} from 'react';
import AuthStack from './AuthStack/AuthStack.nav';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack/MainStack.nav';
import {useAppDispatch, useAppSelector} from '../store/hook/index.hook';
import { useEffect } from 'react';
import { UsuarioController } from '../controller/Usuario/usuario.controller';
import { actions } from '../store/reducer/usuario.reducer';

const AppNavigator: React.FC = (): React.JSX.Element => {
  const isAuthenticated = useAppSelector(
    state => state.usuario.isAuthenticated,
  );
  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
