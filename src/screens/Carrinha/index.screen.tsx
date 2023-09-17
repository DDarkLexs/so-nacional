import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ArtigoContainer1Screen from '../../Layout/Produto/ArtigoContainer1.component';
import SlideGroupContainer from '../../Layout/Produto/SlideGroupContainer.component';

const ShoppingCartScreen = () => {
  const [itemsInCart] = useState([
    {
      id: 1,
      name: 'Item 1',
      price: 10.0,
      image: require('../../assets/image/fruits/banana.png'),
    },
    {
      id: 2,
      name: 'Item 2',
      price: 15.0,
      image: require('../../assets/image/fruits/banana.png'),
    },
    {
      id: 3,
      name: 'Item 3',
      price: 15.0,
      image: require('../../assets/image/fruits/banana.png'),
    },
    // Adicione mais itens ao carrinho conforme necessário
  ]);

  return (
    <ScrollView style={styles.container}>
      <SlideGroupContainer />
      {itemsInCart.map(item => (
        <ArtigoContainer1Screen
          image={item.image}
          nome={item.name}
          preco={item.price}
          id_produto={item.id}
          nome_subcategoria={'any'}
          key={item.id}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: 'auto',
  },
  card: {
    marginBottom: 16,
    padding: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    alignContent: 'center',
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: 'auto',
    height: 150,
    resizeMode: 'cover',
  },
  imageContainer: {
    justifyContent: 'center',
    // alignItems:'center'
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 17,
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 140,
    textAlign: 'center',
  },
  checkoutButtonContainer: {
    marginTop: 16, // Espaçamento superior para separar o botão do carrinho
  },
});

export default ShoppingCartScreen;
