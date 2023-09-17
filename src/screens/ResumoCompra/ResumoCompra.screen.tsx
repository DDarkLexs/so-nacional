import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button, Card, Text, useTheme, Paragraph} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {useEffect} from 'react';
import { useAppSelector } from '../../store/hook/index.hook';
import TransferenciaBancariaScreen from '../TransferenciaBancaria/TransBancaria.screen';
import PagamentoScreen from '../MetodoPagamento/MP.screen';


const ResumoCompraScreen: React.FC<any> = ({navigation}) => {
  const theme = useTheme();
  const encomendaData = useAppSelector(state => state.encomenda.encomenda);
  useEffect(() => {
        
  }, []);
  return (
    <ScrollView style={styles.container}>
      <PagamentoScreen/>
      {/* Card de Resumo de Compra */}
      <TransferenciaBancariaScreen />
      
      <Card style={styles.card}>
        <Card.Title title="Resumo de Compra" />
        <Card.Content>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.value}>{convertToCurrency(1000)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Taxa de Entrega:</Text>
            <Text style={styles.value}>{convertToCurrency(230)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>IVA:</Text>
            <Text style={styles.value}>{convertToCurrency(45)}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Card de Endereço de Entrega */}
      <Card style={styles.card}>
        <Card.Title title="Endereço de Entrega" />
        <Card.Content>
          <Paragraph>Fake Street, 1234</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.confirmButtonContainer}>
        <Button
          mode="contained"
          textColor="white"
          buttonColor={theme.colors.secondary}
          style={styles.confirmButton}
          onPress={() => navigation.navigate('MPagamento')}>
          Pagar
        </Button>
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
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    flex: 1,
    textAlign: 'left',
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
  confirmButtonContainer: {
    marginVertical: 30,
    alignSelf: 'center',
    width: '90%',
  },
  confirmButton: {
    width: '100%',
  },
});

export default ResumoCompraScreen;
