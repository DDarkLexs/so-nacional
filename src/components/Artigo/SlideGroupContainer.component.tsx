import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {CategoriaController} from '../../controller/Categoria/categoria.controller';
import {CategoriaPrincipal} from '../../model/categoria.model';
import {useAppDispatch, useAppSelector} from '../../store/hook/index.hook';
import {
  setCategoriaPrincipal,
  setSelectedCategoria,
} from '../../store/reducer/categoria.store';

const SlideGroupContainer = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const theme = useTheme();
  const controller = new CategoriaController();
  const [categorias, setCategorias] = useState<CategoriaPrincipal[]>([]);
  const dispatch = useAppDispatch();
  const categoriaPrincipal = useAppSelector(
    state => state.categoria.categoriaPrincipal,
  );
  const selected = useAppSelector(
    state => state.categoria.categoria_selecionado,
  );
  const getData = async (): Promise<void> => {
    try {
      const response1 = await controller.fetchCategoriaApi();

      dispatch(setCategoriaPrincipal(response1.data[0].categorias));
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Houve um erro!', ToastAndroid.LONG);
    }
  };
  // Array of button labels
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setActiveButtonIndex(
      categoriaPrincipal.findIndex(item => item.id_categoria === selected),
    );
  }, [selected]);

  const handleButtonPress = (index: number, id_categoria: number) => {
    dispatch(setSelectedCategoria(id_categoria));
    // You can add additional logic here when a button is pressed
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoriaPrincipal.map(({nome_categoria, id_categoria}, index) => (
          <TouchableRipple
            key={index}
            onPress={() => handleButtonPress(index, id_categoria)}
            style={[
              styles.button,
              index === activeButtonIndex ? {backgroundColor: '#f2eee8'} : null,
            ]}>
            <View>
              <Text style={styles.buttonContentText}>{nome_categoria}</Text>
            </View>
          </TouchableRipple>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  button: {
    width: 'auto', // Set the width and height to make it square
    height: 50,
    padding: 10,
    borderRadius: 8, // Adjust the border radius as needed
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    fontWeight: 'bold',
    // Customize the content style inside the square
  },
  buttonContentText: {
    fontWeight: 'bold',
    color: '#615f5f',
    // Customize the content style inside the square
  },
  activeButton: {
    backgroundColor: '#FFD700', // Change to your desired active button color
  },
});

export default SlideGroupContainer;
