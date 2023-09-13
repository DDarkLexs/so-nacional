import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, IconButton, Text, TextInput, useTheme} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';

interface ArtigoContainer1 {
  nome: string;
  preco: number;
  image: any;
}

const ArtigoContainer1Screen: React.FC<ArtigoContainer1> = ({
  image,
  nome,
  preco,
}): React.JSX.Element => {
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

  return (
    <>
      <Card mode="elevated" style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            defaultSource={require('../../assets/image/fruits/banana.png')}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.itemName}> {nome} </Text>
          <Text style={styles.itemPrice}>
            Preço: {convertToCurrency(preco * itemQuantity)}
          </Text>
        </View>

        <View style={styles.quantityControl}>
          <TextInput
            value={itemQuantity.toString()}
            onChangeText={text => setItemQuantity(parseInt(text) || 0)}
            keyboardType="numeric"
            style={styles.quantityInput}
            editable={false}
            mode="outlined"
            left={
              <TextInput.Icon icon={'minus'} onPress={handleRemoveQuantity} />
            }
            right={<TextInput.Icon icon={'plus'} onPress={handleAddQuantity} />}
          />
          <IconButton
            onPress={() => {}}
            containerColor={theme.colors.primary}
            iconColor="white"
            icon="plus"
            style={{marginLeft: 'auto'}}
            size={30}
          />
        </View>
      </Card>
    </>
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
    width: 200,
    height: 150,
    borderRadius: 30,
    alignSelf: 'center',
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
    alignContent: 'space-between',
  },
  quantityInput: {
    width: 140,
    textAlign: 'center',
  },
  checkoutButtonContainer: {
    marginTop: 16, // Espaçamento superior para separar o botão do carrinho
  },
});

export default ArtigoContainer1Screen;
