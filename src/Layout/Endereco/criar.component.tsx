import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Menu,
  Text,
} from 'react-native-paper';
import {Endereco, EnderecoDto, zonaEntrega} from '../../@types/model/endereco.model';
import {showToast} from '../../service/toast.service';
import {useEffect} from 'react';
import {EnderecoController} from '../../controller/Endereco/endereco.controller';

interface AddEnderecoProps {
  visible: boolean;
  onSave: () => void;
  onCancel: () => void;
  onOpen: () => void;
}

const AdicionarEnderecoDialog: React.FC<AddEnderecoProps> = ({
  onCancel,
  visible,
  onSave,
  onOpen,
}) => {
  const controller = new EnderecoController();

  const [endereco, setEndereco] = useState<EnderecoDto>({
    id_user: 0,
    morada: '',
    designacao: '',
    id_zona: 0,
    nome_zona: '',
    bairro: '',
    ponto_ref: '',
    telefone: '',
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleZonaEntregaChange = (text: string) => {
    setEndereco({...endereco, nome_zona: text});
  };

  const handleMenuItemPress = ({id_zona, nome_zona}: zonaEntrega) => {
    setEndereco({...endereco, id_zona, nome_zona});
    hideMenu();
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const [zonaEntregaItems, setZonaEntregaItems] = useState<zonaEntrega[]>([]);
  const getZonasAPI = async () => {
    try {
      setLoading(true);
      await controller.getZonas();
      setZonaEntregaItems(controller.zonasDeEntrega);
    } catch (error) {
      showToast({
        text1: `Houve um erro!`,
        text2: `${error}`,
        position: 'bottom',
        type: 'success',
      });
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      setLoading(true);
      await controller.saveEndereco(endereco);
      showToast({
        text1: `Sucesso!`,
        text2: `O seu endereço foi guardado!`,
        position: 'bottom',
        type: 'success',
      });
      onSave();
    } catch (error) {
      showToast({
        text1: `Houve um erro!`,
        text2: `${error}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      onCancel();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      getZonasAPI();
    }
  }, [visible]);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>Adicionar Endereço</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Morada"
            disabled={loading}
            value={endereco.morada}
            onChangeText={text => setEndereco({...endereco, morada: text})}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Designação"
            disabled={loading}
            value={endereco.designacao}
            onChangeText={text => setEndereco({...endereco, designacao: text})}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Bairro"
            disabled={loading}
            value={endereco.bairro}
            onChangeText={text => setEndereco({...endereco, bairro: text})}
            mode="outlined"
            style={styles.input}
          />

          <Menu
            visible={menuVisible}
            onDismiss={hideMenu}
            anchor={
              <TextInput
                label="Zona de Entrega"
                disabled={loading}
                value={endereco.nome_zona}
                onPressIn={showMenu}
                mode="outlined"
                showSoftInputOnFocus={false}
                style={styles.input}
              />
            }>
            {zonaEntregaItems.map((item: zonaEntrega, i: number) => (
              <Menu.Item
                key={i}
                onPress={() => handleMenuItemPress(item)}
                disabled={loading}
                title={item.nome_zona}
              />
            ))}
          </Menu>

          <TextInput
            label="Ponto de referência"
            disabled={loading}
            value={endereco.ponto_ref}
            onChangeText={text => setEndereco({...endereco, ponto_ref: text})}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Telefone"
            disabled={loading}
            value={endereco.telefone}
            keyboardType="number-pad"
            onChangeText={text => setEndereco({...endereco, telefone: text})}
            mode="outlined"
            style={styles.input}
          />
          {/* <Text>{JSON.stringify(endereco)}</Text> */}
        </Dialog.Content>

        <Dialog.Actions>
          <Button disabled={loading} loading={loading} onPress={save}>
            Salvar
          </Button>
          <Button disabled={loading} loading={loading} onPress={onCancel}>
            Cancelar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    position: 'relative',
    top: 0,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
export default AdicionarEnderecoDialog;
