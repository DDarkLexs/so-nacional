import React, {useEffect} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {useAppSelector} from '../../store/hook/index.hook';
import HomeScreen from '../Home/Home.screen';
import MenuList from '../MenuList/MenuList.screen';
import ProdutosScreen from '../Produtos/Produtos.screen';
import MeuBalaioScreen from '../Carrinha/MeuBalaio.screen';

const PrincipalScreen: React.FC = ({navigation}: any): React.JSX.Element => {
  const [index, setIndex] = React.useState(0);
  const meuBaiao = useAppSelector(state => state.usuario.itens);

  useEffect(() => {
    routes[2].badge = meuBaiao.length;
  }, [meuBaiao]);
  const routes = [
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
      badge: meuBaiao.length,
    },
    {
      key: 'menu',
      title: 'Menu',
      focusedIcon: 'menu',
      unfocusedIcon: 'menu',
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    Home: HomeScreen,
    produtos: ProdutosScreen,
    carrinha: () => <MeuBalaioScreen navigation={navigation} />,
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
