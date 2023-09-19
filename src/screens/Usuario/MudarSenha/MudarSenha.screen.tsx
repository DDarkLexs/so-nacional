import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
import {showToast} from '../../../service/toast.service';
import {UsuarioController} from '../../../controller/Usuario/usuario.controller';

const ChangePasswordScreen: React.FC = () => {
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const controller = new UsuarioController();

  const handlePasswordChange = async () => {
    try {
      setLoading(true);
      if (new_password !== confirmPassword) {
        throw 'As novas senhas não coincidem.';
      }
      console.log({new_password, old_password});
      await controller.alterarSenha({new_password, old_password});
      showToast({
        text1: 'Senha atualizada',
        text2: 'A sua senha foi atualizada com sucesso!',
        position: 'bottom',
        type: 'success',
      });
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
      <Text style={styles.title}>Alterar Senha</Text>
      <TextInput
        style={styles.input}
        label="Senha antiga"
        secureTextEntry={!showOldPassword}
        mode="outlined"
        disabled={loading}
        value={old_password}
        onChangeText={text => setOldPassword(text)}
        right={
          <TextInput.Icon
            icon={showOldPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowOldPassword(!showOldPassword)}
          />
        }
      />
      <TextInput
        style={styles.input}
        label="Nova senha"
        secureTextEntry={!showNewPassword}
        disabled={loading}
        mode="outlined"
        value={new_password}
        onChangeText={text => setNewPassword(text)}
        right={
          <TextInput.Icon
            icon={showNewPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowNewPassword(!showNewPassword)}
          />
        }
      />
      <TextInput
        style={styles.input}
        label="Confirme a nova senha"
        secureTextEntry={!showConfirmPassword}
        mode="outlined"
        disabled={loading}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
      />
      <Button
        disabled={loading}
        loading={loading}
        textColor="white"
        mode="contained"
        onPress={handlePasswordChange}>
        Alterar Senha
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
});

export default ChangePasswordScreen;
