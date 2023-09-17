import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {createNativeStackNavigator as createStackNavigator} from '@react-navigation/native-stack';
import {MainStackStackParamList} from './Model/index.route';
import PrincipalScreen from '../../screens/Principal/Principal.screen';
import Header, {HeaderProps} from '../../Layout/Principal/Header.component';
import DadosDeEntrega from '../../screens/DadosEntrega/DadosDeEntrega.screen';
import ResumoCompraScreen from '../../screens/ResumoCompra/ResumoCompra.screen';
import PagamentoScreen from '../../screens/MetodoPagamento/MP.screen';
import TransferenciaBancariaScreen from '../../screens/TransferenciaBancaria/TransBancaria.screen';
import NEncomendaScreen from '../../screens/NEncomenda/NEncomenda.screen';
import FAQPage from '../../screens/Informacao/FAQ/FAQ.screen';
import ProfileScreen from '../../screens/Usuario/Perfil.screen';
import EditProfileScreen from '../../screens/Usuario/EditarPerfil.screen';
import EnderecoList from '../../screens/Usuario/Endereco/endereco.screen';
import ContactoScreen from '../../screens/Informacao/Contacto/Contacto.screen';
import TermsAndConditionsPage from '../../screens/Informacao/Termos/termos.screen';

const Stack = createStackNavigator<MainStackStackParamList>();

const MainStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: theme.colors.background},
        header: props => (
          <HeaderProps
            back={props.back}
            options={props.options}
            navigation={props.navigation}
          />
        ),
      }}
      initialRouteName="Principal">
      <Stack.Screen
        options={{
          header: ({navigation, back, options}) => (
            <Header back={back} options={options} navigation={navigation} />
          ),
        }}
        name="Principal"
        component={PrincipalScreen}
      />
      <Stack.Screen
        name="DadosDeEntrega"
        options={{
          title: 'Dados da entrega',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={DadosDeEntrega}
      />
      <Stack.Screen
        name="ResumoCompra"
        options={{
          title: 'Resumo de compra',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={ResumoCompraScreen}
      />
      <Stack.Screen
        name="MPagamento"
        options={{
          title: 'Métodos de pagamentos',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={PagamentoScreen}
      />
      <Stack.Screen
        name="TransferenciaBancaria"
        options={{
          title: 'Transferência bancária',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={TransferenciaBancariaScreen}
      />
      <Stack.Screen
        name="NEncomenda"
        options={{
          title: 'Encomenda #79044',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={NEncomendaScreen}
      />
      <Stack.Screen
        name="FAQ"
        options={{
          title: 'Perguntas Frequentes',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={FAQPage}
      />
      <Stack.Screen
        name="Perfil"
        options={{
          title: 'Perfil de Usuário',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditarPerfil"
        options={{
          title: 'Editar Perfil',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="Endereco"
        options={{
          title: 'Meus endereços',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={EnderecoList}
      />
      <Stack.Screen
        name="Termos"
        options={{
          title: 'Termos & Condições',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={TermsAndConditionsPage}
      />
      <Stack.Screen
        name="Contacto"
        options={{
          title: 'Contactos',
          contentStyle: {backgroundColor: theme.colors.background},
        }}
        component={ContactoScreen}
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

export default MainStack;
