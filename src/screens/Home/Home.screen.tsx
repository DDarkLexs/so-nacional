import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import CategoriaContainer1 from '../../Layout/Categoria/categoriaContainer1.component';
import { CategoriaController } from '../../controller/Categoria/categoria.controller';
import { CategoriaPrincipal } from '../../model/categoria.model';
import { showToast } from '../../service/toast.service';
import { useAppDispatch, useAppSelector } from '../../store/hook/index.hook';
import { setCategoriaPrincipal } from '../../store/reducer/categoria.store';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreen = (navigation: any) => {
  const theme = useTheme();
  const [data, setData] = useState<any>();
  const [categorias, setCategorias] = useState<CategoriaPrincipal[]>([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const controller = new CategoriaController();
  const dispatch = useAppDispatch();
  const categoriaPrincipal = useAppSelector(state => state.categoria.categoriaPrincipal);
  const selectedCategoria = useAppSelector(state => state.categoria.categoria_selecionado);
  const placeholder:number[] = [1, 2, 3];

  const getData = async (): Promise<void> => {
    try {
      const response1 = await controller.fetchCategoriaApi();
      dispatch(setCategoriaPrincipal(response1.data[0].categorias));
      setData(response1.data[0]);
      setLoading(false);  // Set loading to false after data is fetched
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
        {loading ? (
          // Show a skeleton placeholder for Card.Cover while loading
          <SkeletonPlaceholder>
            <View style={styles.skeletonCardCover} />
          </SkeletonPlaceholder>
        ) : (
          <Card.Cover
            source={
              data
                ? { uri: data.banners[0].imagem }
                : require('../../assets/image/fruits/istockphoto-1409236261-1024x1024.jpg')
            }
          />
        )}
      </Card>
      <View style={styles.headLine}>
        <Text variant="headlineSmall" style={styles.headTitle}>
          Categorias
          {/* {JSON.stringify(categorias)} */}
        </Text>
      </View>
      <View style={styles.categoryContainer}>
        {loading ? (
          // Show skeleton placeholders for categories while loading
          <SkeletonPlaceholder>
          <React.Fragment>
            {placeholder.map((_: any, index: any, array) => (
              <View key={index} style={styles.skeletonCategoryContainer}>
                <View style={styles.skeletonCategoryImage} />
                <View style={styles.skeletonCategoryText} />
              </View>
            ))}
          </React.Fragment>
        </SkeletonPlaceholder>
        
        
        ) : (
          // Render actual categories when data is available
          categorias.map((item, index) => (
            <CategoriaContainer1
              key={index}
              id_categoria={item.id_categoria}
              imagem_categoria={item.imagem_categoria}
              nome_categoria={item.nome_categoria}
              num_produtos={item.num_produtos}
              navigateTo={nextScreen}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
  },
  headLine: {
    margin: 10,
    marginTop: 20,
  },
  headTitle: {
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginTop: 16,
  },
  skeletonCardCover: {
    width: '100%',
    height: 200, // Adjust the height as needed
    borderRadius: 8,
  },
  skeletonCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  skeletonCategoryImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  skeletonCategoryText: {
    flex: 1,
    height: 20,
    borderRadius: 8,
  },
});

export default HomeScreen;
