import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Avatar,
  Button,
  TextInput,
  IconButton,
  useTheme,
  Text,
} from 'react-native-paper';
import {useAppSelector} from '../../store/hook/index.hook';
import {TouchableRipple} from 'react-native-paper';
import {Usuario, Utilizador} from '../../model/usuario.model';
import {showToast} from '../../service/toast.service';
import {UsuarioController} from '../../controller/Usuario/usuario.controller';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditProfileScreen = ({navigation}: any) => {
  const theme = useTheme();
  const controller = new UsuarioController();
  const user = useAppSelector(state => state.usuario.utilizador);
  const [loading, setLoading] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<Omit<Utilizador, 'foto' | 'id'>>({
    email: String(user?.email),
    nome: String(user?.nome),
    telefone: String(user?.telefone),
  });
  const [imageSource, setImageSource] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: any) => {
        if (response.didCancel) {
        } else if (response.errorCode) {
          console.log(response.errorMessage);
        } else {
          setImageSource(response.assets[0].uri);
          // console.log(response.assets[0].uri);
        }
      },
    );
  };

  const saveChanges = async () => {
    try {
      setLoading(true);
      await controller.atualizarUsuario(usuario, imageSource);

      showToast({
        text1: 'Atualizado',
        text2: `Usuário atualizado com sucesso!`,
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
        text2: `${error}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={150}
          source={{uri: imageSource || String(user?.foto)}}
          style={styles.avatar}
        />
        <View style={styles.editIconContainer}>
          <IconButton
            disabled={loading}
            icon="camera-plus-outline"
            size={35}
            onTouchStart={selectImage}
            mode="contained-tonal"
            iconColor="white"
            // color="white"
            onPress={() => {
              // console.log('oi')
            }}
            containerColor={theme.colors.primary}
            rippleColor={'white'}
            style={styles.editIcon}
          />
        </View>
      </View>
      <TextInput
        value={usuario.nome}
        onChangeText={nome => setUsuario({...usuario, nome})}
        mode="outlined"
        disabled={loading}
        placeholder="Nome"
        style={styles.input}
      />
      <TextInput
        value={usuario.telefone}
        onChangeText={telefone => setUsuario({...usuario, telefone})}
        placeholder="Telefone"
        disabled={loading}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        value={usuario.email}
        onChangeText={email => setUsuario({...usuario, email})}
        placeholder="E-mail"
        disabled={loading}
        mode="outlined"
        style={styles.input}
      />
      {/* 
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
        disabled={loading}
        loading={loading}
        mode="contained"
        textColor="white"
        onPress={saveChanges}
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
