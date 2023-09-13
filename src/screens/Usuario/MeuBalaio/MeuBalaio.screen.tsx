import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Surface, Text, useTheme} from 'react-native-paper';
import ArtigoContainer2 from '../../../components/Artigo/ArtigoContainer2.component';
import {convertToCurrency} from '../../../utils/moeda/moeda.utils';
import CustomButton from '../../../components/Button/Button1.component';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const MeuBalaioScreen: React.FC<any> = ({navigation}) => {
  const theme = useTheme();
  //   console.log(navigation);
  const encomendar = (): void => {
    navigation.navigate('DadosDeEntrega');
  };
  const [products, setProducts] = React.useState<Product[]>([
    {
      id: 1,
      name: 'Produto 1',
      price: 19.99,
      imageUrl: require('../../../assets/image/fruits/banana.png'),
      quantity: 99,
    },
    {
      id: 2,
      name: 'Produto 2',
      price: 29.99,
      imageUrl: require('../../../assets/image/fruits/banana.png'),
      quantity: 2,
    },
    {
      id: 3,
      name: 'Produto 3',
      price: 23.99,
      imageUrl: require('../../../assets/image/fruits/banana.png'),
      quantity: 5,
    },
    {
      id: 4,
      name: 'Produto 4',
      price: 29.99,
      imageUrl: require('../../../assets/image/fruits/banana.png'),
      quantity: 1,
    },
    // Adicione mais produtos conforme necessário
  ]);
  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 150}}>
        {products.map(product => (
          <ArtigoContainer2
            id={product.id}
            key={product.id}
            preco={product.price}
            nome={product.name}
            img={product.imageUrl}
          />
        ))}
      </ScrollView>
      <Surface style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.label}>TOTAL:</Text>
          <Text style={styles.value}>{convertToCurrency(1000)}</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <CustomButton label="Encomendar" onPress={() => encomendar()} />
        </View>
        {/* <Button onPress={() => {}}>  </Button> */}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: 'absolute',
    bottom: -20, // You can adjust this value to control the card's position
    left: 0,
    right: 0,
    height: 170,
    // elevation: 5, // Add elevation for a shadow effect
    // backgroundColor: 'white',
    // margin: 10,
  },
  container: {
    flex: 1,
    // position:'',
    // justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  iconAndInputContainer: {
    alignItems: 'center',
  },
  cardRow: {
    padding: 23,
    flexDirection: 'row', // Arrange components in a row
    alignItems: 'center', // Center components vertically within the row
    justifyContent: 'space-between', // Space evenly within the row
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 28,
  },
});

export default MeuBalaioScreen;
