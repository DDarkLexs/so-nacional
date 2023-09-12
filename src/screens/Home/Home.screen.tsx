import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Avatar, Card, Text, useTheme} from 'react-native-paper';
import {useState} from 'react';
import {useEffect} from 'react';
import axiosIns from '../../api/axiosIns.api';

const categories = [
  {
    name: 'Frutas',
    total: 10,
    imageSource: require('../../assets/image/fruits/banana.png'),
  },
  {
    name: 'Hortaliças',
    total: 15,
    imageSource: require('../../assets/image/fruits/banana.png'),
  },
  {
    name: 'Cereais',
    total: 8,
    imageSource: require('../../assets/image/fruits/banana.png'),
  },
];

const HomeScreen = () => {
  const theme = useTheme();
  const [data, setData] = useState<any>();

  const getData = async (): Promise<void> => {
    try {
      const response1 = (await axiosIns.get('/principal')).data.data[0];
      setData(response1);
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    }
  };
  useEffect(() => {
    getData();
  });

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card} mode={'contained'}>
        <Card.Cover
          source={{uri: !data ? 'http://' : data.banners[0].imagem}}
        />
      </Card>
      <View style={styles.headLine}>
        <Text variant="headlineMedium">Categorias</Text>
      </View>
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryCard,
              {backgroundColor: theme.colors.background},
            ]}
            onPress={() => {}}>
            <View style={styles.categoryCardImage}>
              <Avatar.Image source={category.imageSource} />
            </View>
            <View style={styles.categoryCardContent}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryTotal}>
                {' '}
                {category.total} Produtos
              </Text>
            </View>
          </TouchableOpacity>
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
