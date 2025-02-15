import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, useColorScheme} from 'react-native';
import {
  Card,
  Text,
  TextInput,
  useTheme,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {showToast} from '../../service/toast.service';
import {useAppDispatch} from '../../@types/redux/hook/index.hook';
import {setItem} from '../../store/reducer/usuario.reducer';
import {fazerSubtotal, resizeImage} from '../../utils/index.utils';
import {ProdutoController} from '../../controller/Produto/produto.controller';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {getImageUri, saveImageUri} from '../../service/storage.service';

interface ArtigoContainer1 {
  nome: string;
  id_produto: number;
  preco: number;
  image: any;
  nome_subcategoria: string;
}

const ArtigoContainer1Screen: React.FC<ArtigoContainer1> = ({
  image,
  nome,
  preco,
  id_produto,
  nome_subcategoria,
}): React.JSX.Element => {
  const [quantidade, setQuantidade] = useState<number>(1);
  const dispatch = useAppDispatch();
  const controller = new ProdutoController();
  const [subtotal, setSubtotal] = useState<number>(
    fazerSubtotal(preco, quantidade),
  );
  const [subCategoria, setSubCategoria] = useState<string>(nome_subcategoria);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resizeAndSetImage();
  }, [image]);

  async function resizeAndSetImage() {
    try {
      const imageObject: any = await getImageUri(image);
      if (imageObject) {
        // console.log(imageObject.uri);
        setResizedImage(imageObject.uri);
      } else {
        const resizedImageUri = await resizeImage(image, 125, 125, 3, true);
        await saveImageUri(image, resizedImageUri);
        setResizedImage(resizedImageUri.uri);
      }
      // console.log(uri);
      // console.log(resizedImageUri);
    } catch (error) {
      console.error('Error resizing image:', error);
    } finally {
      setLoading(false);
    }
  }

  const theme = useTheme();

  const handleRemoveQuantity = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const handleAddQuantity = () => {
    setQuantidade(quantidade + 1);
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
        text2: `${nome} foi adicionado para o carrinho!`,
        position: 'top',
        type: 'success',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <>
      <Card
        mode="contained"
        style={[
          styles.card,
          {
            backgroundColor:
              useColorScheme() === 'dark' ? 'transparent' : undefined,
          },
        ]}>
        {loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={125}
                borderRadius={15}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: resizedImage || image}}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        )}

        <View>
          <Text style={[styles.itemInfo, {color: theme.colors.primary}]}>
            {' '}
            {subCategoria}{' '}
          </Text>
          <Text style={styles.itemName}> {nome} </Text>
          <Text style={styles.itemPrice}>{convertToCurrency(subtotal)}</Text>
        </View>

        <View style={styles.quantityControl}>
          <TextInput
            value={quantidade.toString()}
            onChangeText={text => setQuantidade(parseInt(text) || 0)}
            keyboardType="numeric"
            style={styles.quantityInput}
            editable={false}
            dense={true}
            mode="outlined"
            left={
              <TextInput.Icon
                size={16}
                icon={'minus'}
                onLongPress={handleRemoveQuantity}
                onPress={handleRemoveQuantity}
              />
            }
            right={
              <TextInput.Icon
                size={16}
                icon={'plus'}
                onLongPress={handleAddQuantity}
                onPress={handleAddQuantity}
              />
            }
          />
        </View>

        <Surface style={styles.addButtonContainer}>
          <TouchableRipple
            onPress={addToMeuBaio}
            rippleColor={'white'}
            style={[
              styles.addButton,
              {backgroundColor: theme.colors.secondary},
            ]}
            underlayColor={theme.colors.primary}>
            <Text style={styles.addButtonLabel}>Adicionar</Text>
          </TouchableRipple>
        </Surface>
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
    marginBottom: 5,
    padding: 7,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 0.3,
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
    fontWeight: '100',
    padding: 2,
    marginTop: 5,
  },
  itemName: {
    fontWeight: '200',
    fontSize: 14,
    margin: 2,
  },
  itemPrice: {
    fontSize: 13,
    margin: 3,
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
    marginBottom: 12,
    overflow: 'hidden',
    marginHorizontal: 6,
    marginTop: 16,
    borderRadius: 10,
  },
  addButton: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
    padding: 8,
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
