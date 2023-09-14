import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import {UsuarioController} from '../../../controller/Usuario/usuario.controller';
import {showToast} from '../../../service/toast.service';
import {useAppDispatch} from '../../../store/hook/index.hook';
import {actions} from '../../../store/reducer/usuario.reducer';

const EntradaScreen: React.FC<any> = ({navigation}) => {
  const [telemovel, setTelemovel] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const dispatch = useAppDispatch();
  const controller = new UsuarioController();
  const handleLogin = async (): Promise<void> => {
    try {
      // Lógica de autenticação
      setLoading(true);
      const response = await controller.autenticar({password, telemovel});
      showToast({
        text1: 'Sucesso',
        text2: 'Autenticação autorizado!',
        position: 'bottom',
        type: 'success',
      });
      dispatch(actions.setUtilizador(response));
      console.log(response);
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
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

  const handleForgotPassword = () => {
    // Lógica para recuperar a senha
    // navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/image/logo.png')}
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
        keyboardType="phone-pad"
        onChangeText={setTelemovel}
        style={styles.input}
      />
      <TextInput
        label="Sua senha"
        value={password}
        mode="outlined"
        disabled={loading}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity disabled={loading}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <Button
        disabled={loading}
        loading={loading}
        mode="contained"
        onPress={handleLogin}
        style={styles.button}>
        Entrar
      </Button>
      <TouchableOpacity disabled={loading} onPress={handleRegister}>
        <Text style={styles.register}>Cadastrar-me</Text>
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <Checkbox
          disabled={loading}
          status={agreedToTerms ? 'checked' : 'unchecked'}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        />
        <Text disabled={loading} style={styles.checkboxLabel}>
          Concordo com os{' '}
          <Text
            disabled={loading}
            onPress={() => navigation.navigate('termos&condicoes')}
            style={styles.termos}>
            Termos e Condições
          </Text>
        </Text>
      </View>
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
    // alignItems: 'center',
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
    // textAlign: 'center',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  termos: {
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

export default EntradaScreen;
