import React, {useState, useEffect} from 'react';
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

interface NovaSenhaProp {
  telemovel: string;
  password: string;
}

const CriacaoNovaSenhaScreen: React.FC<any> = ({navigation, route}) => {
  const [data, setData] = useState<NovaSenhaProp>({
    password: '',
    telemovel: route.params.telemovel,
  });
  const [senha2, setSenha2] = useState<string>('');
  const [senhaVisibility, setSenhaVisibility] = useState<boolean>(true);
  const [senhaVisibility2, setSenhaVisibility2] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const controller = new UsuarioController();

  useEffect(() => {
    console.log(data);
  }, []);

  const toggleSenhaVisibility = () => {
    setSenhaVisibility(!senhaVisibility);
  };
  const toggleSenhaVisibility2 = () => {
    setSenhaVisibility2(!senhaVisibility2);
  };

  const handleCreateNewPassword = async (): Promise<void> => {
    // Restante do código

    try {
      if (data.password !== senha2) {
        throw 'As senhas não coincidem. Por favor, verifique e tente novamente.';
      }
      // Lógica de criação de nova senha
      setLoading(true);
      // Simulando a criação de uma nova senha
      await controller.criarNovaSenha(data);
      // Vamos apenas mostrar uma mensagem de sucesso
      navigation.navigate('Entrada');
      showToast({
        text1: 'Criado com sucesso',
        text2: 'A sua nova senha criada com sucesso!',
        position: 'top',
        type: 'success',
      });
      // Você pode adicionar a lógica real de criação de senha aqui

      // Após a criação da nova senha, você pode navegar para a próxima tela ou fazer o que for necessário
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'top',
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
      <Text style={styles.headLine} variant="headlineSmall">
        Criação de Nova Senha
      </Text>
      <TextInput
        label="Nova Senha"
        value={data.password}
        disabled={loading}
        mode="outlined"
        onChangeText={password => setData({...data, password})}
        style={[styles.input, {marginTop: 30}]}
        secureTextEntry={senhaVisibility}
        right={
          <TextInput.Icon
            icon={senhaVisibility ? 'eye' : 'eye-off'}
            onPress={toggleSenhaVisibility}
          />
        }
      />
      <TextInput
        label="Confirmar Nova Senha"
        disabled={loading}
        mode="outlined"
        value={senha2}
        onChangeText={setSenha2}
        secureTextEntry={senhaVisibility2}
        style={styles.input}
        right={
          <TextInput.Icon
            icon={senhaVisibility2 ? 'eye' : 'eye-off'}
            onPress={toggleSenhaVisibility2}
          />
        }
      />
      <Button
        disabled={loading}
        loading={loading}
        mode="contained"
        textColor="white"
        onPress={handleCreateNewPassword}
        style={styles.button}>
        Criar Nova Senha
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
    marginBottom: 16,
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

export default CriacaoNovaSenhaScreen;
