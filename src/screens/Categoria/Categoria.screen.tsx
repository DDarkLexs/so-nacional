import * as React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Text,
  Card,
  IconButton,
  TextInput,
  Title,
  Paragraph,
  Button,
  Surface,
} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import ArtigoContainer2 from '../../components/Artigo/ArtigoContainer2.component';

const CategoriaScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Categoria</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: 'absolute',
    bottom: -20, // You can adjust this value to control the card's position
    left: 0,
    right: 0,
    height: 170,
    // elevation: 5, // Add elevation for a shadow effect
    // backgroundColor: 'white',
    // margin: 10,
  },
  container: {
    flex: 1,
    // position:'',
    // justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  iconAndInputContainer: {
    alignItems: 'center',
  },
  cardRow: {
    padding: 23,
    flexDirection: 'row', // Arrange components in a row
    alignItems: 'center', // Center components vertically within the row
    justifyContent: 'space-between', // Space evenly within the row
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 28,
  },
});

export default CategoriaScreen;
