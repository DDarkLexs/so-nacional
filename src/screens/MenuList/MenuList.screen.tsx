import React from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {List, Avatar, Button} from 'react-native-paper';
import {useAppDispatch} from '../../store/hook/index.hook';
import {actions, setIsAuthenticated, setUtilizador} from '../../store/reducer/usuario.reducer';
import {UsuarioController} from '../../controller/Usuario/usuario.controller';

const MenuList: React.FC<any> = ({navigation}): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const controller = new UsuarioController();
  const terminarSessao = async () => {
    try {
      await controller.terminarSessao();
      dispatch(setUtilizador(null));
      dispatch(setIsAuthenticated(false));
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    }
  };
  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <List.Item
          title="John Doe"
          description="johndoe@example.com"
          left={() => (
            <Avatar.Image
              size={64}
              style={styles.img}
              source={require('../../assets/image/usuario/user.png')}
            />
          )}
        />
      </View>
      {/* List.Section */}
      <List.Section>
        <List.Item title="Item 1" />
        <List.Item
          title="Meu Balaio"
          onPress={() => navigation.navigate('MeuBalaio')}
        />
        <List.Item title="Perguntas frequentes" onPress={() => {}} />
        <List.Item title="Definição" onPress={() => {}} />
      </List.Section>

      {/* Logout Button */}

      <Button
        mode="contained"
        onPress={terminarSessao}
        style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  img: {backgroundColor: undefined},
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default MenuList;
