import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, Divider, List, Title} from 'react-native-paper';
import {useAppSelector} from '../../store/hook/index.hook';

const ProfileScreen = ({navigation}: any) => {
  const usuario = useAppSelector(state => state.usuario.utilizador);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image size={150} source={{uri: usuario?.foto}} />
        <Title style={styles.name}>{usuario?.nome}</Title>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('EditarPerfil');
            // Adicione aqui a ação para editar o perfil
          }}
          style={styles.editButton}>
          Editar Perfil
        </Button>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => {
            // Adicione aqui a ação para os Termos e Condições
          }}
          style={styles.option}>
          <List.Item
            title="Termos e Condições"
            right={() => <List.Icon icon="chevron-right" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FAQ');
            // Adicione aqui a ação para as Perguntas Frequentes
          }}
          style={styles.option}>
          <List.Item
            title="Perguntas Frequentes"
            right={() => <List.Icon icon="chevron-right" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            // Adicione aqui a ação para terminar a sessão
          }}
          style={styles.option}>
          <List.Item
            title="Terminar Sessão"
            right={() => <List.Icon icon="chevron-right" />}
          />
        </TouchableOpacity>
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
  editButton: {
    marginTop: 20,
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
