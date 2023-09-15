import React from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {Avatar, Button, List} from 'react-native-paper';
import {UsuarioController} from '../../controller/Usuario/usuario.controller';
import {useAppDispatch, useAppSelector} from '../../store/hook/index.hook';
import {setUtilizador} from '../../store/reducer/usuario.reducer';
import {showToast} from '../../service/toast.service';

const MenuList: React.FC<any> = ({navigation}): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const controller = new UsuarioController();
  const utilizador = useAppSelector(state => state.usuario.utilizador);
  const terminarSessao = async () => {
    try {
      await controller.terminarSessao();
      dispatch(setUtilizador(null));
      // dispatch(setIsAuthenticated(false));
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'bottom',
        type: 'error',
      });
    }
  };
  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <List.Item
          title={utilizador?.nome}
          description={utilizador?.telefone}
          left={() => (
            <Avatar.Image
              size={64}
              style={styles.img}
              source={{uri: utilizador?.foto}}
            />
          )}
        />
      </View>
      {/* List.Section */}
      <List.Section>
        {/* <List.Item title="Perfil" /> */}
        <List.Item
          title="Meu Perfil"
          onPress={() => navigation.navigate('Perfil')}
        />
        <List.Item
          title="Meus endereços"
          onPress={() => navigation.navigate('Endereco')}
        />
        <List.Item title="Minhas Compras" onPress={() => {}} />
        <List.Item title="Contactos" onPress={() => {}} />
        <List.Item title="Definição" onPress={() => {}} />
      </List.Section>

      {/* Logout Button */}

      <Button
        mode="contained"
        onPress={terminarSessao}
        style={styles.logoutButton}>
        Terminar sessão
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
