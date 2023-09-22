import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MeuBaiao } from '../../@types/model/usuario.model';
import { useAppDispatch } from '../../@types/redux/hook/index.hook';
import { updateItem } from '../../store/reducer/usuario.reducer';
import { convertToCurrency } from '../../utils/moeda/moeda.utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import SkeletonPlaceholder

interface ArtigoContainer2Props extends MeuBaiao {
  index: number;
}

const ArtigoContainer3: React.FC<ArtigoContainer2Props> = (
  artigo,
): React.ReactElement => {
  const { index, preco } = artigo;
  const [itemQuantity, setItemQuantity] = useState<number>(artigo.quantidade);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleRemoveQuantity = useCallback(() => {
    if (itemQuantity > 1) {
      dispatch(updateItem({ index, preco, quantidade: itemQuantity - 1 }));
    }
  }, [dispatch, index, preco, itemQuantity]);

  const handleAddQuantity = useCallback(() => {
    dispatch(updateItem({ index, preco, quantidade: itemQuantity + 1 }));
  }, [dispatch, index, preco, itemQuantity]);

  const imageError = function <T>(error: T) {
    // console.warn(error)
  };

  return (
    <View>
      <Card mode="outlined" style={[styles.card]}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.productName}>
              {artigo.nome_produto || 'Loading...'} {/* Display 'Loading...' if product name is not available */}
            </Text>
            <Text style={styles.productPrice}>
              {artigo.preco
                ? convertToCurrency(artigo.preco * artigo.quantidade)
                : 'Loading...'} {/* Display 'Loading...' if product price is not available */}
            </Text>
          </View>
          <View style={styles.ImgContainer}>
            {artigo.image ? (
              <Image
                source={{ uri: artigo.image }}
                style={styles.image}
                onError={(e) => imageError(e.nativeEvent.error)}
              />
            ) : (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  width={80}
                  height={80}
                  borderRadius={10}
                />
              </SkeletonPlaceholder>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderWidth: 0.1,
    borderRadius: 5,
    borderColor: 'gray',
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
    fontSize: 17,
    color: 'gray',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  ImgContainer: {
    alignItems: 'flex-end',
  },
});

export default React.memo(ArtigoContainer3);
