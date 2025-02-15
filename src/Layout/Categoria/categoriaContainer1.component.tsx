import React from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {
  Avatar,
  Card,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {CategoriaPrincipal} from '../../@types/model/categoria.model';
import {useAppDispatch} from '../../@types/redux/hook/index.hook';
import {setSelectedCategoria} from '../../store/reducer/categoria.reducer';

interface CategoriaProps extends CategoriaPrincipal {
  navigateTo: () => void;
}

const CategoriaContainer1: React.FC<CategoriaProps> = item => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const pressedCategoria = () => {
    dispatch(setSelectedCategoria(item.id_categoria));
    item.navigateTo();
  };

  return (
    <Surface mode="flat" style={[styles.touchableRippleContainer]}>
      <TouchableRipple
        onPress={pressedCategoria}
        style={styles.touchableRipple}>
        <Card.Content style={styles.categoryCardContent}>
          <View style={styles.categoryCardImage}>
            <Avatar.Image source={{uri: item.imagem_categoria}} size={64} />
          </View>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryName}>{item.nome_categoria}</Text>
            <Text style={styles.categoryTotal}>
              {item.num_produtos} Produto
            </Text>
          </View>
        </Card.Content>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  touchableRippleContainer: {
    borderWidth: 0.4, // Add a border to the container
    borderColor: 'gray', // Border color
    backgroundColor: 'transparent',
    marginBottom: 26,
    borderRadius: 12,
    overflow: 'hidden', // Ensure the border doesn't overflow
    // marginVertical: 10,
  },
  touchableRipple: {
    borderRadius: 8,
  },
  categoryCardContent: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryCardImage: {
    marginRight: 16,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryTotal: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CategoriaContainer1;
