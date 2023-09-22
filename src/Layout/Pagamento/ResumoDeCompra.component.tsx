import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Divider,Text} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {
  useAppDispatch,
  useAppSelector,
} from '../../@types/redux/hook/index.hook';
import {IVA} from '../../service/constant.service';
import {taxaServico, total_iva} from '../../utils/index.utils';
import {setEncomendaProps} from '../../store/reducer/encomenda.reducer';

const ResumoDeCompra: React.FC<any> = (): React.JSX.Element => {
  const encomenda = useAppSelector(state => state.encomenda.encomenda);
  const {taxa_servico, imposto, subtotal, itens, taxa_entrega} = useAppSelector(
    state => state.encomenda.encomenda,
  );
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.encomenda.loading);
  const [taxaDeServico, setTaxaDeServico] = useState<number>(
    taxaServico(subtotal, taxa_servico),
  );
  const [iva, setIva] = useState<number>(
    total_iva(subtotal, taxaDeServico, taxa_entrega, IVA),
  );

  useEffect(() => {
    dispatch(
      setEncomendaProps({
        total: subtotal + iva,
      }),
    );
  }, [encomenda]);
  return (
    <Card disabled={loading} mode="outlined" style={styles.card}>
      <Card.Title title="Resumo de Compra" />
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>{itens.length} produto:</Text>
          <Text style={styles.value}>{convertToCurrency(subtotal)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxa do serviço</Text>
          <Text style={styles.value}>{convertToCurrency(taxaDeServico)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            Imposto (IVA {IVA}%):
          </Text>
          <Text style={styles.value}>{convertToCurrency(iva)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxa de Entrega:</Text>
          <Text style={styles.value}>
            {convertToCurrency(Number(taxa_entrega))}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Entrega:</Text>
          <Text style={styles.value}>
            {'Domicílio'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pagamento:</Text>
          <Text style={styles.value}>
            {encomenda.tipo_pagamento}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.row1}>
          <Text style={styles.label1} variant='titleLarge'>Total a pagar</Text>
          <Text style={styles.value1} variant='titleLarge'>
            {convertToCurrency(encomenda.total)}
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

export default ResumoDeCompra;
