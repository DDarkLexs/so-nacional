import React, {useState} from 'react';
import {View} from 'react-native';
import {Menu, IconButton, Divider} from 'react-native-paper';
import {Encomendas} from '../../@types/model/encomenda.model';

const MinhaEncomendaDT: React.FC<any> = ({navigation, encomenda}) => {
  const [visible, setVisible] = useState(false);

  const {id_compra}: Encomendas = encomenda;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const nextScreen = () => {
    closeMenu();
    navigation.navigate('NEncomenda', {id_compra});
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
        <Menu.Item
          onPress={nextScreen}
          title="Ver detalhes"
          leadingIcon="information"
        />
        <Menu.Item onPress={() => {}} title="Editar" leadingIcon="pencil" />
        {/* <Divider /> */}
        <Menu.Item onPress={() => {}} title="Apagar" leadingIcon="delete" />
      </Menu>
    </View>
  );
};

export default MinhaEncomendaDT;
