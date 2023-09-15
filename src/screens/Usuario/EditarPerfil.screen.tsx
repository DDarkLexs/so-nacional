import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Avatar,
  Button,
  TextInput,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {useAppSelector} from '../../store/hook/index.hook';

const EditProfileScreen = ({navigation}: any) => {
  const theme = useTheme();
  const usuario = useAppSelector(state => state.usuario.utilizador);

  const [nome, setNome] = useState(usuario?.nome);
  const [telefone, setTelefone] = useState(usuario?.telefone);
  const [email, setEmail] = useState(usuario?.email);
  const [senha, setSenha] = useState('');
  const [morada, setMorada] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={150}
          source={{uri: usuario?.foto}}
          style={styles.avatar}
        />
        <View style={styles.editIconContainer}>
          <IconButton
            icon="plus"
            size={40}
            iconColor="white"
            // color="white"
            onPress={() => {
              // console.log('oi')
            }}
            containerColor={theme.colors.primary}
            rippleColor={'white'}
            background={theme.colors.primary}
            style={styles.editIcon}
          />
        </View>
      </View>
      <TextInput
        mode="outlined"
        placeholder="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        mode="outlined"
        value={telefone}
        onChangeText={text => setTelefone(text)}
        style={styles.input}
      />
      {/* <TextInput
        placeholder='E-mail'
        mode="outlined"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        value={senha}
        placeholder='Senha'
        onChangeText={(text) => setSenha(text)}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        mode="outlined"
        placeholder='Morada'
        value={morada}
        multiline={true}
        onChangeText={(text) => setMorada(text)}
        style={styles.input}
      /> */}
      <Button
        mode="contained"
        onPress={() => {
          // Adicione aqui a ação para guardar as alterações no perfil
        }}
        style={styles.saveButton}>
        Guardar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    marginTop: 20,
    backgroundColor: 'lightgray',
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  editIcon: {
    // backgroundColor: 'blue',
  },
  label: {
    // marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginVertical: 5,
  },
  saveButton: {
    marginTop: 20,
    width: '100%',
  },
});

export default EditProfileScreen;
