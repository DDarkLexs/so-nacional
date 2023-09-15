import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, IconButton, Text, TextInput} from 'react-native-paper';
import {MeuBaiao} from '../../model/usuario.model';
import {showToast} from '../../service/toast.service';
import {useAppDispatch} from '../../store/hook/index.hook';
import {removeItem, updateItem} from '../../store/reducer/usuario.reducer';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';

interface ArtigoContainer2Props extends MeuBaiao {
  index: number;
}

const ArtigoContainer2: React.FC<ArtigoContainer2Props> = (
  artigo,
): React.ReactElement => {
  const {index, preco} = artigo;
  const [itemQuantity, setItemQuantity] = useState<number>(artigo.quantidade);
  const dispatch = useAppDispatch();

  const handleRemoveQuantity = useCallback(() => {
    if(itemQuantity > 1){
      dispatch(updateItem({index, preco, quantidade: itemQuantity - 1}));
    }
  }, [dispatch, index, preco, itemQuantity]);

  const handleAddQuantity = useCallback(() => {
    dispatch(updateItem({index, preco, quantidade: itemQuantity + 1}));
  }, [dispatch, index, preco, itemQuantity]);

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

  const imageError = function <T>(error: T) {
    // console.warn(error)
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
                <TextInput.Icon icon={'plus'} onPress={handleAddQuantity} />
              }
              right={
                <TextInput.Icon icon={'minus'} onPress={handleRemoveQuantity} />
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
    alignItems: 'flex-end',
  },
});

export default React.memo(ArtigoContainer2);
