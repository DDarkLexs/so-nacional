import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {useAppDispatch, useAppSelector} from '../../@types/redux/hook/index.hook';

const ResumoDeCompra: React.FC<any> = (): React.JSX.Element => {
  const encomendaData = useAppSelector(state => state.encomenda.encomenda);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.encomenda.loading);


  return (
    <Card disabled={loading} mode="outlined" style={styles.card}>
      <Card.Title title="Resumo de Compra" />
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>
            {encomendaData.itens.length} produto:
          </Text>
          <Text style={styles.value}>
            {convertToCurrency(encomendaData.subtotal)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxa de Entrega:</Text>
          <Text style={styles.value}>
            {convertToCurrency(Number(encomendaData.taxa_entrega))}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>IVA:</Text>
          <Text style={styles.value}>{convertToCurrency(45)}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 26,
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

export default ResumoDeCompra;
