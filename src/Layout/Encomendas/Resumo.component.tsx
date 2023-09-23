import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';
import {MinhasCompra} from '../../@types/model/encomenda.model';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {total_iva} from '../../utils/index.utils';

const DadosResumoDeCompra: React.FC<{compra: MinhasCompra}> = ({
  compra,
}): React.JSX.Element => {
  const {data_compra, imposto, taxa_entrega, itens, total, subtotal} = compra;
  const dataDeCompra = data_compra;
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title title="Resumo de Compra" />
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>{itens?.length} produto:</Text>
          <Text style={styles.value}>
            {convertToCurrency(Number(subtotal))}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxa de Entrega:</Text>
          <Text style={styles.value}>
            {convertToCurrency(Number(taxa_entrega.replaceAll('"', '')))}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Imposto</Text>
          <Text style={styles.value}>IVA {Number(imposto)}%</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Data da compra:</Text>
          <Text style={styles.value}>{dataDeCompra}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.row1}>
          <Text style={styles.label1} variant="titleLarge">
            Total
          </Text>
          <Text style={styles.value1} variant="titleLarge">
            {convertToCurrency(Number(total))}
          </Text>
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
  divider: {
    marginVertical: 10,
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
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label1: {
    flex: 1,
    textAlign: 'left',
  },
  value1: {
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

export default DadosResumoDeCompra;
