import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import CategoriaContainer1 from '../../components/categoria/categoriaContainer1.component';
import {CategoriaController} from '../../controller/Categoria/categoria.controller';
import {CategoriaPrincipal} from '../../model/categoria.model';
import {showToast} from '../../service/toast.service';
import {useAppDispatch, useAppSelector} from '../../store/hook/index.hook';
import {setCategoriaPrincipal} from '../../store/reducer/categoria.store';

const HomeScreen = (navigation: any) => {
  const theme = useTheme();
  const [data, setData] = useState<any>();
  const [categorias, setCategorias] = useState<CategoriaPrincipal[]>([]);
  const controller = new CategoriaController();
  const dispatch = useAppDispatch();
  const categoriaPrincipal = useAppSelector(
    state => state.categoria.categoriaPrincipal,
  );

  const selectedCategoria = useAppSelector(
    state => state.categoria.categoria_selecionado,
  );
  const getData = async (): Promise<void> => {
    try {
      const response1 = await controller.fetchCategoriaApi();
      dispatch(setCategoriaPrincipal(response1.data[0].categorias));
      setData(response1.data[0]);
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'bottom',
        type: 'error',
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const nextScreen = () => {
    navigation.jumpTo('produtos');
  };
  useEffect(() => {
    if (selectedCategoria) {
      // showToast({
      //   text1: 'foi selecionado categoria!',
      //   text2: `${selectedCategoria}`,
      //   position: 'bottom',
      //   type: 'success',
      // });
    }
  }, [selectedCategoria]);

  useEffect(() => {
    setCategorias(categoriaPrincipal);
  }, [categoriaPrincipal]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card} mode={'contained'}>
        <Card.Cover
          source={
            data
              ? {uri: data.banners[0].imagem}
              : require('../../assets/image/fruits/istockphoto-1409236261-1024x1024.jpg')
          }
        />
      </Card>
      <View style={styles.headLine}>
        <Text variant="headlineSmall" style={styles.headTitle}>
          Categorias
          {/* {JSON.stringify(categorias)} */}
        </Text>
      </View>
      <View style={styles.categoryContainer}>
        {categorias.map((item, index) => (
          <CategoriaContainer1
            key={index}
            id_categoria={item.id_categoria}
            imagem_categoria={item.imagem_categoria}
            nome_categoria={item.nome_categoria}
            num_produtos={item.num_produtos}
            navigateTo={nextScreen}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 100,
  },
  container: {
    flex: 1,
    padding: 16,
    // bottom: 30,
  },
  headTitle: {
    // flexDirection: 'column',
    fontWeight: 'bold',
  },
  headLine: {
    // flexDirection: 'column',
    margin: 10,
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: 'column',
    marginTop: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white', // Cor de fundo do card
    borderRadius: 8,
    elevation: 4, // Sombra do card (pode variar de acordo com seu estilo)
  },
  categoryCardImage: {
    flex: 1,
    marginRight: 16,
    // Estilize a imagem como desejar
  },
  categoryCardContent: {
    flex: 2,
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

export default HomeScreen;
