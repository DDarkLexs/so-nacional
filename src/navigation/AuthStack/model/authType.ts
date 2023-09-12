import {RouteProp} from '@react-navigation/native';
import EntradaScreen from '../../../screens/Authentication/entrada/Entrada.screen';

export type AuthStackStackParamList = {
  Entrada: undefined;
  Registro: undefined;
  'termos&condicoes': undefined;
  ForgotPassword: undefined;
  ConfirmarTelemovel: undefined;
};

export type EntradaScreenRouteProp = RouteProp<
  AuthStackStackParamList,
  'Entrada'
>;
export type RegistroScreenRouteProp = RouteProp<
  AuthStackStackParamList,
  'Registro'
>;
