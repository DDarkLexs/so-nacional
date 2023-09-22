import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Button, Text, useTheme} from 'react-native-paper';
import {useAppSelector} from '../../@types/redux/hook/index.hook';

const ProfileScreen = ({navigation}: any) => {
  const usuario = useAppSelector(state => state.usuario.utilizador);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image size={150} source={{uri: usuario?.foto}} />
        <Text style={styles.name}>{usuario?.nome}</Text>
        <Text variant="bodyLarge">{usuario?.telefone}</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            textColor="white"
            color={theme.colors.secondary}
            onPress={() => {
              navigation.navigate('EditarPerfil');
            }}
            icon="pencil"
            style={styles.button}>
            Editar Perfil
          </Button>

          <Button
            mode="contained"
            textColor="white"
            color={theme.colors.secondary}
            onPress={() => {
              navigation.navigate('MudarPass');
            }}
            icon="key"
            style={styles.button}>
            Mudar Senha
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row', // Alinha os botões na horizontal
    marginTop: 20,
    justifyContent: 'center', // Centraliza os botões na linha
  },
  button: {
    marginRight: 10, // Espaçamento entre os botões
  },
});

export default ProfileScreen;
