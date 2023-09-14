import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, IconButton, Text, TextInput, useTheme} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {showToast} from '../../service/toast.service';
import {useAppDispatch} from '../../store/hook/index.hook';
import {setItem} from '../../store/reducer/usuario.reducer';
import {fazerSubtotal} from '../../utils/index.utils';

interface ArtigoContainer1 {
  nome: string;
  id_produto: number;
  preco: number;
  image: any;
}

const ArtigoContainer1Screen: React.FC<ArtigoContainer1> = ({
  image,
  nome,
  preco,
  id_produto,
}): React.JSX.Element => {
  const [quantidade, setQuatidade] = useState<number>(1);
  const dispatch = useAppDispatch();
  const [subtotal, setSubtotal] = useState<number>(
    fazerSubtotal(preco, quantidade),
  );

  useEffect(() => {
    setSubtotal(fazerSubtotal(preco, quantidade));
  }, [quantidade]);
  const theme = useTheme();
  const handleRemoveQuantity = () => {
    if (quantidade > 1) {
      setQuatidade(quantidade - 1);
    }
  };

  const handleAddQuantity = () => {
    setQuatidade(quantidade + 1);
  };
  const addToMeuBaio = (): void => {
    try {
      dispatch(
        setItem({
          id_produto,
          nome_produto: nome,
          preco,
          quantidade,
          subtotal,
          image,
        }),
      );
      showToast({
        text1: 'Adicionado',
        text2: `${nome} foi adicionado para o Baiao!`,
        position: 'top',
        type: 'success',
      });
    } catch (error) {}
  };

  return (
    <>
      <Card mode="elevated" style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            resizeMode="contain"
            defaultSource={require('../../assets/image/fruits/banana.png')}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.itemName}> {nome} </Text>
          <Text style={styles.itemPrice}>
            Preço: {convertToCurrency(subtotal)}
          </Text>
        </View>

        <View style={styles.quantityControl}>
          <TextInput
            value={quantidade.toString()}
            onChangeText={text => setQuatidade(parseInt(text) || 0)}
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
            onPress={addToMeuBaio}
            containerColor={theme.colors.primary}
            iconColor="white"
            icon="plus"
            style={styles.addButton}
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
    marginBottom: 26,
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
    width: '100%',
    height: 200,
    borderRadius: 15,
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
  addButton: {marginLeft: 'auto'},
  checkoutButtonContainer: {
    marginTop: 16, // Espaçamento superior para separar o botão do carrinho
  },
});

export default ArtigoContainer1Screen;
