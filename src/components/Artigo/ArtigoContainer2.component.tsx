import * as React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, Card, IconButton, TextInput, useTheme} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {useState} from 'react';
import {MeuBaiao} from '../../model/usuario.model';
import {useEffect} from 'react';
import {showToast} from '../../service/toast.service';
import {useAppDispatch, useAppSelector} from '../../store/hook/index.hook';
import {
  setItem,
  removeItem,
  updateItem,
} from '../../store/reducer/usuario.reducer';

interface ArtigoContainer2 extends MeuBaiao {
  index: number;
}

const ArtigoContainer2: React.FC<ArtigoContainer2> = (
  artigo,
): React.JSX.Element => {
  const {index} = artigo;
  const [itemQuantity, setItemQuantity] = useState<number>(artigo.quantidade);
  const dispatch = useAppDispatch();
 
  const handleRemoveQuantity = () => {};

  const handleAddQuantity = () => {};

  const remove = (): void => {
    try {
      dispatch(removeItem(index));

      showToast({
        text1: `${artigo.nome_produto}`,
        text2: 'Foi removido',
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {}
  };

  useEffect(()=>{
    // console.log(artigo);
  })
  const imageError = function <T>(error: T) {
    // console.error(error)
  };

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Image
              source={{uri: artigo.image}}
              style={styles.image}
              onError={e => imageError(e.nativeEvent.error)}
            />
            <Text style={styles.productName}>{artigo.nome_produto}</Text>
            <Text style={styles.productPrice}>
              {convertToCurrency(artigo.preco * artigo.quantidade)}
            </Text>
          </View>
          <View style={styles.iconAndInputContainer}>
            <IconButton size={30} icon="delete-outline" onPress={remove} />
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
    borderRadius: 10,
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
