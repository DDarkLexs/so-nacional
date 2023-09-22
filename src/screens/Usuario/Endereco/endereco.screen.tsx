import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  IconButton,
  FAB,
  Dialog,
  Portal,
  Button,
  TextInput,
  Menu,
  Divider,
  Provider,
  Text,
  Card,
  useTheme,
} from 'react-native-paper';
import {NavigationContainerRef} from '@react-navigation/native';
import ZonaDeEntregaInputComponent from '../../../components/Menu/ZonaDeEntrega.component';
import {Endereco} from '../../../@types/model/endereco.model';
import AdicionarEnderecoDialog from '../../../Layout/Endereco/criar.component';
import {EnderecoController} from '../../../controller/Endereco/endereco.controller';
import {showToast} from '../../../service/toast.service';
import {useAppDispatch, useAppSelector} from '../../../@types/redux/hook/index.hook';
import {setEndereco} from '../../../store/reducer/endereco.store.reducer';
import {convertToCurrency} from '../../../utils/moeda/moeda.utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ConfirmDialog from '../../../components/Dialog/Confirmar.component';
import EditarEnderecoDialog from '../../../Layout/Endereco/Editar.component';

interface EnderecoListProps {
  data: Endereco[];
  //   navigation: NavigationContainerRef;
}

const EnderecoList: React.FC = ({navigation}: any) => {
  const controller = new EnderecoController();
  const theme = useTheme();
  // await controller.getEnderecoAllByUser();

  const enderecos = useAppSelector<Endereco[]>(
    state => state.endereco.endereco,
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Endereco | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<Endereco | null>(null);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const showDialog = (item: Endereco) => {
    setSelectedItem(item);
    setVisible(true);
  };
  const setEditItem = (item: any) => {
    console.log(item);
    setEditDialog(true);
  }

  const showEditDialog = (item: any) => {
    console.log(item);
  };
  const closeEditDialog = () => {
    setEditDialog(false);
  };

  const confirmDialogDel = async () => {
    try {
      setLoading(true);

      if (selectedItem?.id_endereco) {
        await controller.deleteEndereco(selectedItem?.id_endereco);
      }
      setSelectedItem(null);
      setVisible(false);

      await getEndereco();
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: `${error}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const hideDialog = () => {
    setSelectedItem(null);
    setVisible(false);
  };

  const navigateToEdit = (item: Endereco) => {
    setEditing(true);
    setEditedItem(item);
  };

  const [zonaEntrega, setZonaEntrega] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const [criarVisible, setCriarVisible] = useState(false);
  const showCriar = () => setCriarVisible(true);
  const hideCriar = () => setCriarVisible(false);

  const confirmCriarDialog = () => {
    getEndereco();
    hideCriar();
  };

  const handleZonaEntregaChange = (text: string) => {
    setZonaEntrega(text);
  };

  const handleMenuItemPress = (item: any) => {
    setZonaEntrega(item);
    hideMenu();
  };
  const getEndereco = async () => {
    try {
      setLoading(true);
      await controller.getEnderecoAllByUser();

      dispatch(setEndereco(controller.enderecos));
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: `${error}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEndereco();
  }, []);

  return (
    <>
      <EditarEnderecoDialog
        onSave={closeEditDialog}
        onOpen={showEditDialog}
        onCancel={closeEditDialog}
        visible={editDialog}
      />
      <ScrollView style={styles.container}>
        <ConfirmDialog
          onConfirm={confirmDialogDel}
          onDismiss={hideDialog}
          visible={visible}
        />
        <AdicionarEnderecoDialog
          visible={criarVisible}
          onSave={confirmCriarDialog}
          onCancel={hideCriar}
          onOpen={showCriar}
        />
        {loading ? (
          <View>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <SkeletonPlaceholder key={index}>
                <View style={styles.skeletonCardCover} />
              </SkeletonPlaceholder>
            ))}
          </View>
        ) : (
          enderecos.map((item: Endereco) => (
            <Card key={item.id_endereco} style={styles.card}>
              <Card.Content>
                <Text>Designação: {item.designacao}</Text>
                <Text>Morada: {item.nome_morada}</Text>
                <Text>Bairro: {item.bairro}</Text>
                <Text>
                  Taxa de entrega: {convertToCurrency(item.taxa_entrega || 0)}
                </Text>
                <Text>Ponto de referência: {item.ponto_ref}</Text>
                <Text>Telefone: {item.telefone}</Text>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  mode="contained-tonal"
                  icon="pencil"
                  onPress={() => setEditItem(item)}
                  iconColor={'white'}
                  containerColor={theme.colors.secondary}
                />
                <IconButton
                  icon="delete"
                  iconColor={'white'}
                  containerColor={theme.colors.primary}
                  onPress={() => showDialog(item)}
                />
              </Card.Actions>
            </Card>
          ))
        )}
      </ScrollView>
      <FAB
        style={[
          styles.fab,
          {backgroundColor: !loading ? theme.colors.secondary : undefined},
        ]}
        color={'white'}
        rippleColor={'white'}
        loading={loading}
        disabled={loading}
        icon="plus"
        label="Novo Endereço"
        onPress={() => setCriarVisible(true)}
      />
    </>
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
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
  button: {
    marginTop: 16,
  },
  skeletonCardCover: {
    width: '100%',
    marginVertical: 5,
    height: 200, // Adjust the height as needed
    borderRadius: 8,
  },
});

export default EnderecoList;
