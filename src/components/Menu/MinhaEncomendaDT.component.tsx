import React, {useState} from 'react';
import {View} from 'react-native';
import {Menu, IconButton, Divider} from 'react-native-paper';
import {Encomendas} from '../../@types/model/encomenda.model';
import {showToast} from '../../service/toast.service';
import {EncomendaController} from '../../controller/Encomenda/encomenda.controller';

const MinhaEncomendaDT: React.FC<any> = ({navigation, encomenda}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {id_compra}: Encomendas = encomenda;
  const controller = new EncomendaController();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const nextScreen = async () => {
    try {
      setLoading(true);
      await controller.getOne(id_compra);
      navigation.navigate('NEncomenda', {id_compra});
    } catch (error) {
      setLoading(false);
      showToast({
        text1: 'Houve erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
      closeMenu();
    }
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton disabled={loading} icon="dots-vertical" onPress={openMenu} />}>
        <Menu.Item
          disabled={loading}
          onPress={nextScreen}
          title="Ver detalhes"
          leadingIcon="information"
        />
        <Menu.Item disabled={loading} onPress={() => {}} title="Editar" leadingIcon="pencil" />
        {/* <Divider /> */}
        <Menu.Item disabled={loading} onPress={() => {}} title="Apagar" leadingIcon="delete" />
      </Menu>
    </View>
  );
};

export default MinhaEncomendaDT;
