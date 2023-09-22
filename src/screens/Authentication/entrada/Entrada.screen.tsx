import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import {UsuarioController} from '../../../controller/Usuario/usuario.controller';
import {showToast} from '../../../service/toast.service';
import {useAppDispatch} from '../../../@types/redux/hook/index.hook';
import {actions} from '../../../store/reducer/usuario.reducer';

const EntradaScreen: React.FC<any> = ({navigation}) => {
  const [telemovel, setTelemovel] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const dispatch = useAppDispatch();
  const controller = new UsuarioController();

  const handleLogin = async (): Promise<void> => {
    try {
      // Lógica de autenticação
      setLoading(true);
      const response = await controller.autenticar({password, telemovel});
      console.log(response);
      showToast({
        text1: 'Sucesso',
        text2: 'Autenticação autorizada!',
        position: 'bottom',
        type: 'success',
      });
      dispatch(actions.setUtilizador(response));
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (): void => {
    // Lógica de registro
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            useColorScheme() === 'dark'
              ? require('../../../assets/image/logo-dark.png')
              : require('../../../assets/image/logo.png')
          }
          style={styles.image}
        />
      </View>
      <Text style={styles.headLine} variant="headlineLarge">
        {' '}
        Faça Login{' '}
      </Text>
      <TextInput
        label="Número de telemóvel"
        value={telemovel}
        disabled={loading}
        mode="outlined"
        left={<TextInput.Icon icon={'cellphone'} />}
        keyboardType="phone-pad"
        onChangeText={setTelemovel}
        style={styles.input}
      />
      <TextInput
        label="Sua senha"
        value={password}
        mode="outlined"
        disabled={loading}
        left={<TextInput.Icon icon={'lock'} />}
        onChangeText={setPassword}
        right={
          showPassword ? (
            <TextInput.Icon
              onPress={() => setShowPassword(!showPassword)}
              icon="eye"
              size={20}
            />
          ) : (
            <TextInput.Icon
              onPress={() => setShowPassword(!showPassword)}
              icon="eye-off"
              size={20}
            />
          )
        }
        secureTextEntry={!showPassword} // Use secureTextEntry based on password visibility
        style={styles.input}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('NTelemovel')}
        disabled={loading}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <Button
        disabled={loading}
        loading={loading}
        mode="contained"
        textColor="white"
        onPress={handleLogin}
        style={styles.button}>
        Entrar
      </Button>
      <TouchableOpacity disabled={loading} onPress={handleRegister}>
        <Text style={styles.register}>Cadastrar-me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  headLine: {textAlign: 'center', fontWeight: 'bold', marginVertical: 10},
  image: {
    justifyContent: 'center',
    width: 250,
    height: 130,
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    marginBottom: 8,
  },
  register: {
    textAlign: 'center',
    marginVertical: 16,
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  passwordVisibilityIcon: {
    position: 'absolute',
    top: 50, // Adjust the position as needed
    right: 15, // Adjust the position as needed
  },
});

export default EntradaScreen;
