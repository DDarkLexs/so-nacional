import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Card,
  Text,
  TextInput,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';
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
            {convertToCurrency(subtotal)}
          </Text>
        </View>

        <View style={styles.quantityControl}>
          <TextInput
            value={quantidade.toString()}
            onChangeText={text => setQuatidade(parseInt(text) || 0)}
            keyboardType="numeric"
            style={styles.quantityInput}
            editable={false}
            dense={true}
            mode="outlined"
            left={
              <TextInput.Icon icon={'minus'} onPress={handleRemoveQuantity} />
            }
            right={<TextInput.Icon icon={'plus'} onPress={handleAddQuantity} />}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableRipple
            onPress={addToMeuBaio}
            rippleColor={'white'}
            style={[styles.addButton, {backgroundColor: theme.colors.primary}]}
            underlayColor={theme.colors.primary}>
            <Text style={styles.addButtonLabel}>Adicionar</Text>
          </TouchableRipple>
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
    padding: 7,
  },
  image: {
    width: '100%',
    height: 125,
    borderRadius: 15,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  imageContainer: {
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 15,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quantityInput: {
    width: 'auto',
    textAlign: 'center',
  },
  addButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  addButton: {
    justifyContent:'center',
    textAlign: 'center',
    alignItems:'center',
    padding: 8,
    marginBottom:10,
    width: '100%',
    // backgroundColor: '#1976D2', // Change to your desired button color
    borderRadius: 10,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButtonContainer: {
    marginTop: 16,
  },
});

export default ArtigoContainer1Screen;
