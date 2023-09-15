import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DataTable,
  IconButton,
  FAB,
  Dialog,
  Portal,
  Button,
  TextInput,
  Menu,
  Divider,
  Provider,
} from 'react-native-paper';
import {NavigationContainerRef} from '@react-navigation/native';
import {Endereco} from '../../../model/usuario.model';
import ZonaDeEntregaInputComponent from '../../../components/Menu/ZonaDeEntrega.component';

interface EnderecoListProps {
  data: Endereco[];
  //   navigation: NavigationContainerRef;
}

const EnderecoList: React.FC = ({navigation}: any) => {
  const data = [] as Endereco[];
  const [page, setPage] = useState<number>(0);
  const [itemsPerPageList] = useState<number[]>([5, 10, 15]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageList[0]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Endereco | null>(null);
  const [nomeZona, setNomeZona] = useState('');

  // Edit state
  const [editing, setEditing] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<Endereco | null>(null);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const showDialog = (item: Endereco) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const hideDialog = () => {
    setSelectedItem(null);
    setVisible(false);
  };

  const navigateToEdit = (item: Endereco) => {
    setEditing(true);
    setEditedItem(item);
  };

  const onSaveEdit = () => {
    // Implement your save edit logic here.
    setEditing(false);
    setEditedItem(null);
    hideDialog(); // Fechar o Dialog após salvar
  };

  const onCancelEdit = () => {
    setEditing(false);
    setEditedItem(null);
    hideDialog(); // Fechar o Dialog ao cancelar
  };

  const [zonaEntrega, setZonaEntrega] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const handleZonaEntregaChange = (text: string) => {
    setZonaEntrega(text);
  };

  const handleMenuItemPress = (item: any) => {
    setZonaEntrega(item);
    hideMenu();
  };

  const zonaEntregaItems = ['Zona 1', 'Zona 2', 'Zona 3', 'Zona 4']; // Substitua isso pelos seus próprios valores

  return (
    <View style={styles.container}>
      <DataTable>
        <ZonaDeEntregaInputComponent />
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Morada</DataTable.Title>
          <DataTable.Title>Editar</DataTable.Title>
          <DataTable.Title>Eliminar</DataTable.Title>
        </DataTable.Header>

        {data.slice(from, to).map((item: Endereco) => (
          <DataTable.Row key={item.id_endereco}>
            <DataTable.Cell>{item.id_endereco}</DataTable.Cell>
            <DataTable.Cell>{item.morada}</DataTable.Cell>
            <DataTable.Cell>
              <IconButton icon="pencil" onPress={() => navigateToEdit(item)} />
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton icon="delete" onPress={() => showDialog(item)} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} de ${data.length}`}
          numberOfItemsPerPageList={itemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={perPage => setItemsPerPage(perPage)}
          showFastPaginationControls
          selectPageDropdownLabel={'Linhas por página'}
        />
      </DataTable>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirmar exclusão</Dialog.Title>
          <Dialog.Content>
            Tem certeza de que deseja excluir este endereço?
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancelar</Button>
            <Button onPress={() => {}}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={editing} onDismiss={onCancelEdit}>
          <Dialog.Title>Editar Endereço</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Morada"
              value={editedItem?.morada || ''}
              onChangeText={text => {
                // Implement your change logic here.
              }}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Designação"
              value={editedItem?.designacao || ''}
              onChangeText={text => {
                // Implement your change logic here.
              }}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Bairro"
              value={editedItem?.bairro.toString() || ''}
              onChangeText={text => {
                // Implement your change logic here.
              }}
              mode="outlined"
              style={styles.input}
            />

            <Menu
              visible={menuVisible}
              onDismiss={hideMenu}
              anchor={
                <TextInput
                  label="Zona de Entrega"
                  value={zonaEntrega}
                  onPressIn={showMenu}
                  mode="outlined"
                  showSoftInputOnFocus={false}
                  style={styles.input}
                  //   style={{ width: 300 }} // Defina o estilo conforme necessário
                />
              }>
              {zonaEntregaItems.map(item => (
                <Menu.Item
                  key={item}
                  onPress={() => handleMenuItemPress(item)}
                  title={item}
                />
              ))}
            </Menu>

            <TextInput
              label="Ponto de referência"
              value={editedItem?.ponto_ref || ''}
              onChangeText={text => {
                // Implement your change logic here.
              }}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Telefone"
              value={editedItem?.telefone || ''}
              onChangeText={text => {
                // Implement your change logic here.
              }}
              mode="outlined"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onSaveEdit}>Salvar</Button>
            <Button onPress={onCancelEdit}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Novo Endereço"
        onPress={() => setEditing(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  editContainer: {
    padding: 16,
    backgroundColor: 'white',
    elevation: 4,
    margin: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default EnderecoList;
