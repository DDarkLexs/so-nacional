import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {showToast} from '../../../service/toast.service';
import {UsuarioController} from '../../../controller/Usuario/usuario.controller';
import {useAppDispatch} from '../../../@types/redux/hook/index.hook';
import {actions} from '../../../store/reducer/usuario.reducer';

const VerificacaoNumeroTelefoneScreen: React.FC<any> = ({navigation}) => {
  const [telemovel, setTelemovel] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const controller = new UsuarioController();

  const handleVerifyPhoneNumber = async (): Promise<void> => {
    try {
      // Lógica de verificação do número de telefone
      setLoading(true);
      // Simulando uma verificação
      // Vamos apenas mostrar uma mensagem de sucesso
      await controller.recuperarSenha(telemovel);
      navigation.navigate('VCodigo', {telemovel});
      // showToast({
      //   text1: 'Número de telefone verificado',
      //   // text2: 'Número de telefone verificado!',
      //   position: 'bottom',
      //   type: 'success',
      // });
      // Você pode adicionar a lógica real de verificação aqui

      // Após a verificação, você pode navegar para a próxima tela ou fazer o que for necessário
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
      <Text style={styles.headLine} variant="titleLarge">
        Verificação de Número de Telefone
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
      <Button
        disabled={loading}
        loading={loading}
        mode="contained"
        textColor="white"
        onPress={handleVerifyPhoneNumber}
        style={styles.button}>
        Verificar Número de Telefone
      </Button>
      <TouchableOpacity disabled={loading} onPress={() => navigation.goBack()}>
        <Text style={styles.goBack}>Voltar</Text>
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
  headLine: {textAlign: 'center', fontWeight: 'bold', marginVertical: 20},
  image: {
    justifyContent: 'center',
    width: 250,
    height: 130,
    alignItems: 'center',
  },
  input: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    marginBottom: 8,
  },
  goBack: {
    textAlign: 'center',
    marginVertical: 16,
    textDecorationLine: 'underline',
  },
});

export default VerificacaoNumeroTelefoneScreen;
