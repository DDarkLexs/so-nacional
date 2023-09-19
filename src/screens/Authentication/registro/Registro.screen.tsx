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
import {Usuario} from '../../../model/usuario.model';
import {showToast} from '../../../service/toast.service';
const RegistroScreen: React.FC<any> = ({navigation}) => {
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nome, setNome] = useState<Usuario['nome']>('');
  const [telemovel, setTelemovel] = useState<Usuario['telemovel']>('');
  const [password, setPassword] = useState<Usuario['password']>('');
  const controller = new UsuarioController();
  // nome,telemovel, password
  const handleEntrada = () => {
    navigation.navigate('Entrada', {});
  };

  const registrar = async (): Promise<void> => {
    try {
      setLoading(true);

      if (!agreedToTerms) {
        throw 'Deve concordar com os termos e condições';
      }
      const response = await controller.registar({nome, telemovel, password});
      navigation.navigate('ConfirmarTelemovel', {telemovel});
      // console.log(response);
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
      <View>
        <Text style={styles.headLine} variant="headlineLarge">
          {' '}
          Registro{' '}
        </Text>
      </View>
      <TextInput
        disabled={loading}
        label="Nome completo"
        value={nome}
        mode="outlined"
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        disabled={loading}
        label="Número de telefone"
        value={telemovel}
        mode="outlined"
        keyboardType="phone-pad"
        onChangeText={setTelemovel}
        style={styles.input}
      />
      <TextInput
        disabled={loading}
        label="Sua senha"
        mode="outlined"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button
        loading={loading}
        mode="contained"
        textColor="white"
        disabled={loading}
        onPress={registrar}
        style={styles.button}>
        Registrar
      </Button>
      <TouchableOpacity disabled={loading} onPress={handleEntrada}>
        <Text style={styles.forgotPasswordText}>
          Já tenho conta, fazer Login
        </Text>
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
  headLine: {textAlign: 'center', fontWeight: 'bold', marginVertical: 10},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
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
  termos: {
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
});

export default RegistroScreen;
