import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {showToast} from '../../../service/toast.service';
import {UsuarioController} from '../../../controller/Usuario/usuario.controller';
import {useAppDispatch} from '../../../@types/redux/hook/index.hook';
import {actions} from '../../../store/reducer/usuario.reducer';
import {Usuario} from '../../../@types/model/usuario.model';

interface VerificacaoCodigoProp extends Pick<Usuario, 'telemovel'> {
  codigo: string;
}

const ValidacaoCodigoScreen: React.FC<any> = ({navigation, route}) => {
  const [validacao, setValidacao] = useState<VerificacaoCodigoProp>({
    codigo: '',
    telemovel: route.params.telemovel,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const controller = new UsuarioController();

  useEffect(() => {
    // console.log(route.params.telemovel);
    // navigation.
  }, []);

  const handleValidateCode = async (): Promise<void> => {
    try {
      // Lógica de validação do código
      setLoading(true);
      // Simulando uma validação
      // Vamos apenas mostrar uma mensagem de sucesso
      await controller.validarCodigo(validacao);
      showToast({
        text1: 'Verificado!',
        text2: 'Código validado com sucesso!',
        position: 'bottom',
        type: 'success',
      });
      navigation.navigate('CNSenha', {telemovel: validacao.telemovel});
      // Você pode adicionar a lógica real de validação aqui
      // Após a validação, você pode navegar para a próxima tela ou fazer o que for necessário
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'bottom',
        type: 'error',
      });
      hasErrors();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneNumber = async (): Promise<void> => {
    try {
      // Lógica de verificação do número de telefone
      setLoading(true);
      // Simulando uma verificação
      // Vamos apenas mostrar uma mensagem de sucesso
      await controller.recuperarSenha(validacao.telemovel);

      showToast({
        text1: 'Número de reenviado com sucesso!',
        text2: 'Irá receber uma mensagem!',
        position: 'bottom',
        type: 'success',
      });
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

  const hasErrors = () => {
    return !validacao.codigo.includes('@');
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
        Validação de Código
      </Text>
      <TextInput
        label="Código"
        value={validacao.codigo}
        disabled={loading}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={codigo => setValidacao({...validacao, codigo})}
        style={styles.input}
      />
      <HelperText style={styles.TextHelper} type="info" visible={true}>
        Irá receber uma mensagem!
      </HelperText>
      <Button
        disabled={loading}
        loading={loading}
        mode="contained"
        textColor="white"
        onPress={handleValidateCode}
        style={styles.button}>
        Validar Código
      </Button>
      <TouchableOpacity disabled={loading} onPress={handleVerifyPhoneNumber}>
        <Text style={styles.goBack}>Reenviar o código</Text>
      </TouchableOpacity>
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
  headLine: {textAlign: 'center', fontWeight: 'bold', marginVertical: 10},
  image: {
    justifyContent: 'center',
    width: 250,
    height: 130,
    alignItems: 'center',
  },
  input: {
    marginTop: 30,
    // marginBottom: 20,
  },
  TextHelper: {
    // marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
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

export default ValidacaoCodigoScreen;
