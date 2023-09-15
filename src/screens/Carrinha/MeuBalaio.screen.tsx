import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import ArtigoContainer2 from '../../Layout/Produto/ArtigoContainer2.component';
import CustomButton from '../../components/Button/Button1.component';
import {useAppSelector} from '../../store/hook/index.hook';
import {fazerSubtotal} from '../../utils/index.utils';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';

const MeuBalaioScreen: React.FC<any> = ({navigation}) => {
  // const theme = useTheme();
  //   console.log(navigation);
  const encomendar = (): void => {
    navigation.navigate('DadosDeEntrega');
  };
  const meuBaiao = useAppSelector(state => state.usuario.itens);
  const contas = useAppSelector(state => state.usuario.itens).map(
    ({quantidade, preco}) => fazerSubtotal(preco, quantidade),
  );
  const total: number = contas.reduce(
    (acumulador, current) => acumulador + current,
    0,
  );
  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 150}}>
        {meuBaiao.map((producto, i) => (
          <ArtigoContainer2
            id_produto={producto.id_produto}
            key={i}
            index={i}
            preco={producto.preco}
            nome_produto={producto.nome_produto}
            quantidade={producto.quantidade}
            subtotal={producto.subtotal}
            image={producto.image}
          />
        ))}
      </ScrollView>
      <Surface style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.label}>TOTAL:</Text>
          <Text style={styles.value}>{convertToCurrency(total)}</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <CustomButton label="Encomendar" onPress={() => encomendar()} />
        </View>
        {/* <Button onPress={() => {}}>  </Button> */}
      </Surface>
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

export default MeuBalaioScreen;
