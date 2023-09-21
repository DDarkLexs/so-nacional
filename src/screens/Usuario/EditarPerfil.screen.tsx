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
import { useAppSelector, useAppDispatch } from '../../store/hook/index.hook';
import {TouchableRipple} from 'react-native-paper';
import {Usuario, Utilizador} from '../../model/usuario.model';
import {showToast} from '../../service/toast.service';
import {UsuarioController} from '../../controller/Usuario/usuario.controller';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  Asset,
  ImageLibraryOptions
} from 'react-native-image-picker';
import {pickSingle} from 'react-native-document-picker';
import { setUtilizador } from '../../store/reducer/usuario.reducer';

const EditProfileScreen = ({navigation}: any) => {
  const theme = useTheme();
  const controller = new UsuarioController();
  const user = useAppSelector(state => state.usuario.utilizador);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [usuario, setUsuario] = useState<Omit<Utilizador, 'foto' | 'id'>>({
    email: String(user?.email),
    nome: String(user?.nome),
    telefone: String(user?.telefone),
  });
  const [imageSource, setImageSource] = useState<Asset>({uri: ''});

  const selectImage = () => {
    const options = {
      title: 'Selecione uma foto de perfil',
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
          setImageSource(response.assets[0]);

          console.log(imageSource);
        }
      },
    );
  };

  const saveChanges = async () => {
    try {
      setLoading(true);
      await controller.atualizarUsuario(usuario, imageSource);
      await controller.terminarSessao();
      dispatch(setUtilizador(null));
      showToast({
        text1: 'Usuário atualizado!',
        text2: 'terminamos a sua sessão para podermos atualizar os seus dados!',
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
          source={{uri: imageSource.uri || String(user?.foto)}}
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
        keyboardType='phone-pad'
        style={styles.input}
      />
      <TextInput
        value={usuario.email}
        onChangeText={email => setUsuario({...usuario, email})}
        placeholder="E-mail"
        disabled={loading}
        keyboardType="email-address"
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
