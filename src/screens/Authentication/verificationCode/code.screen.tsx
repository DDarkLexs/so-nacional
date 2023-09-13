import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {UsuarioController} from '../../../controller/Usuario/usuario.controller';
import {useEffect} from 'react';

const ReceavingCode: React.FC<any> = ({navigation, route}) => {
  const {telemovel} = route.params;
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const controller = new UsuarioController();
  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      const response = await controller.verificarCodigo(
        Number(verificationCode),
        telemovel,
      );
      if (response.message === 'Código não verificado') {
        throw 'código inserido é inválido!';
      }

      ToastAndroid.show(response.message, ToastAndroid.LONG);
      handleEntrada();
    } catch (error) {
      ToastAndroid.show('Houve um erro!', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
    // Your logic to verify the verification code
    // console.log(`Verification code verified: ${verificationCode}`);
  };

  useEffect(() => {
    // console.log(telemovel);
  }, []);

  const handleResendCode = () => {
    // Your logic to resend the verification code
    console.log('Resending verification code...');
  };
  const handleEntrada = () => {
    navigation.navigate('Entrada');
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentImg}>
          <Image
            source={require('../../../assets/image/logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.contentText}>
          Insira por favor a palavra-passe genérica que enviamos para o seu
          telemóvel
        </Text>
        <TextInput
          label="Código"
          disabled={loading}
          value={verificationCode}
          onChangeText={text => setVerificationCode(text)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <Button
          mode="contained"
          disabled={loading}
          loading={loading}
          onPress={handleVerifyCode}
          style={styles.button}>
          Verificar
        </Button>
        <TouchableOpacity disabled={loading} onPress={handleEntrada}>
          <Text style={styles.login}>Já tenho conta, fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={loading} onPress={handleResendCode}>
          <Text style={styles.resendText}>Não recebi o código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 6,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  contentText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  contentImg: {
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 130,
  },
  login: {
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  resendText: {
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
});

export default ReceavingCode;
