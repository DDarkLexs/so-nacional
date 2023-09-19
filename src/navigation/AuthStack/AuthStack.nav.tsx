import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import RegistroScreen from '../../screens/Authentication/registro/Registro.screen';
import EntradaScreen from '../../screens/Authentication/entrada/Entrada.screen';
import {createNativeStackNavigator as createStackNavigator} from '@react-navigation/native-stack';
import {AuthStackStackParamList} from './model/authType';
import TermsAndConditionsPage from '../../screens/Informacao/Termos/termos.screen';
import ReceavingCode from '../../screens/Authentication/verificationCode/code.screen';
import {HeaderProps} from '../../Layout/Principal/Header.component';
import VerificacaoNumeroTelefoneScreen from '../../screens/Authentication/RecuperacaoDeSenha/NTelefone.screen';
import ValidacaoCodigoScreen from '../../screens/Authentication/RecuperacaoDeSenha/VCodigo.screen';
import CriacaoNovaSenhaScreen from '../../screens/Authentication/RecuperacaoDeSenha/NovaSenha.screen';

const Stack = createStackNavigator<AuthStackStackParamList>();

const AuthStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.colors.background},
      }}>
      <Stack.Screen name="Entrada" component={EntradaScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="ConfirmarTelemovel" component={ReceavingCode} />
      <Stack.Screen name="ForgotPassword" component={ReceavingCode} />
      <Stack.Screen name="NTelemovel" component={VerificacaoNumeroTelefoneScreen} />
      <Stack.Screen name="VCodigo" component={ValidacaoCodigoScreen} />
      <Stack.Screen name="CNSenha" component={CriacaoNovaSenhaScreen} />
      <Stack.Screen
        name="termos&condicoes"
        options={{
          headerShown: true,
          title: 'Termos e Condições',
          header: props => (
            <HeaderProps
              back={props.back}
              options={props.options}
              navigation={props.navigation}
            />
          ),
        }}
        component={TermsAndConditionsPage}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    margin: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
});

export default AuthStack;
