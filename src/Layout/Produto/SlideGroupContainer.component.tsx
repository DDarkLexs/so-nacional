import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Surface, Text, TouchableRipple} from 'react-native-paper';
import {CategoriaPrincipal} from '../../@types/model/categoria.model';
import {
  useAppDispatch,
  useAppSelector,
} from '../../@types/redux/hook/index.hook';
import {CategoriaController} from '../../controller/Categoria/categoria.controller';
import {showToast} from '../../service/toast.service';
import {
  setCategoriaPrincipal,
  setSelectedCategoria,
} from '../../store/reducer/categoria.reducer';

const SlideGroupContainer = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
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
      dispatch(setSelectedCategoria(categoriaPrincipal[0].id_categoria));
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setActiveButtonIndex(0);
    }
  };
  // Array of button labels
  useEffect(() => {
    if (activeButtonIndex === -1) {
      getData();
    }
  }, [activeButtonIndex]);
  useEffect(() => {
    return () => {
      // showToast({position: 'bottom', text1: 'saiu'});
    };
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
      <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
        {categoriaPrincipal.map(({nome_categoria, id_categoria}, index) => (
          <Surface key={index} mode='flat' style={styles.ButtonContainer}>
            <TouchableRipple
              onPress={() => handleButtonPress(index, id_categoria)}
              style={[
                styles.button,
                index === activeButtonIndex
                  ? {backgroundColor: '#f2eee8'}
                  : null,
              ]}>
              <View>
                <Text style={styles.buttonContentText}>{nome_categoria}</Text>
              </View>
            </TouchableRipple>
          </Surface>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginTop: 18,
  },
  ButtonContainer:{
    // borderWidth: 0.4, // Add a border to the container
    // borderColor: 'gray', // Border color
    // backgroundColor: 'transparent',
    marginBottom: 6,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 6
  },
  button: {
    borderRadius: 8,
    padding: 12,
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
