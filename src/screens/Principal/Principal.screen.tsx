import React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import CarrinhaScreen from '../Carrinha/index.screen';
import HomeScreen from '../Home/Home.screen';
import MenuList from '../MenuList/MenuList.screen';
import ProdutosScreen from '../Produtos/Produtos.screen';

const PrincipalScreen: React.FC = ({navigation}: any): React.JSX.Element => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: 'Home',
      title: 'Principal',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'produtos',
      title: 'produtos',
      focusedIcon: 'text-box',
      unfocusedIcon: 'text-box-outline',
    },
    {
      key: 'carrinha',
      title: 'Carrinha',
      focusedIcon: 'cart',
      unfocusedIcon: 'cart-outline',
      badge: 3,
    },
    {
      key: 'menu',
      title: 'Menu',
      focusedIcon: 'menu',
      unfocusedIcon: 'menu',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: HomeScreen,
    produtos: ProdutosScreen,
    carrinha: CarrinhaScreen,
    // registro: () => <Text>4</Text>,
    menu: () => <MenuList navigation={navigation} />,
  });

  return (
    <BottomNavigation
      shifting={true}
      sceneAnimationType="shifting"
      compact={true}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // style={{bott:100 }}
    />
  );
};

export default PrincipalScreen;
