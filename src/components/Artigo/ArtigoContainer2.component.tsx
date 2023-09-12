import * as React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, Card, IconButton, TextInput, useTheme} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {useState} from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
interface Artigo {
  id: number;
  nome: string;
  preco: number;
  img: any;
}

const ArtigoContainer2: React.FC<Artigo> = (artigo): React.JSX.Element => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const theme = useTheme();
  const handleRemoveQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleAddQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  };

  //   const handleDelete = (id: number) => {
  //     const updatedProducts = products.filter(product => product.id !== id);
  //     setProducts(updatedProducts);
  //   };

  //   const handleQuantityChange = (id: number, quantity: number) => {
  //     const updatedProducts = products.map(product =>
  //       product.id === id ? {...product, quantity} : product,
  //     );
  //     setProducts(updatedProducts);
  //   };

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Image
              source={artigo.img}
              style={styles.image}
            />
            <Text style={styles.productName}>{artigo.nome}</Text>
            <Text style={styles.productPrice}>
              {convertToCurrency(artigo.preco * itemQuantity)}
            </Text>
          </View>
          <View style={styles.iconAndInputContainer}>
            <IconButton size={30} icon="delete-outline" onPress={() => {}} />
            <TextInput
              keyboardType="numeric"
              style={{width: 130}}
              textAlign="center"
              editable={false}
              inputMode="numeric"
              mode="outlined"
              value={itemQuantity.toString()}
              onChangeText={text => setItemQuantity(parseInt(text) || 0)}
              
              left={
                <TextInput.Icon icon={'minus'} onPress={handleRemoveQuantity} />
              }
              right={
                <TextInput.Icon icon={'plus'} onPress={handleAddQuantity} />
              }
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
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
    fontSize: 15,
    color: 'gray',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  iconAndInputContainer: {
    alignItems: 'center',
  },
});

export default ArtigoContainer2;
