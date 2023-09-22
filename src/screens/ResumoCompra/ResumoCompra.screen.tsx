import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button, Card, Text, useTheme, Paragraph} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../@types/redux/hook/index.hook';
import TransferenciaBancariaScreen from '../TransferenciaBancaria/TransBancaria.screen';
import PagamentoScreen from '../MetodoPagamento/MP.screen';
import {EnderecoController} from '../../controller/endereco/endereco.controller';
import {showToast} from '../../service/toast.service';
import {useState} from 'react';
import {Endereco} from '../../@types/model/endereco.model';
import {
  setEncomendaInfo,
  setEncomendaProps,
} from '../../store/reducer/encomenda.store';
import axiosIns from '../../api/axiosIns.api';
import {Loja} from '../../@types/model/loja';
import ResumoDeCompra from '../../Layout/Pagamento/ResumoDeCompra.component';

const ResumoCompraScreen: React.FC<any> = ({navigation}) => {
  const theme = useTheme();
  const [endereco, setEndereco] = useState<Partial<Endereco> | undefined>();
  const encomendaData = useAppSelector(state => state.encomenda.encomenda);
  const loading = useAppSelector(state => state.encomenda.loading);

  const dispatch = useAppDispatch();
  const enderecoController = new EnderecoController();
  const prepareAlldata = async (): Promise<void> => {
    try {
      await enderecoController.getEnderecoAllByUser();
      const enderecoSelecionado = enderecoController.enderecos.find(
        state => state.id_endereco === encomendaData.id_endereco,
      );
      setEndereco(enderecoSelecionado);

      // console.log(enderecoController.enderecos);
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'success',
      });
    }
  };
  useEffect(() => {
    prepareAlldata();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* layout de tipo de pagamento */}
      <PagamentoScreen />
      {/*  */}
      <TransferenciaBancariaScreen />
      {/* Card de Resumo de Compra */}
      <ResumoDeCompra />
      {/* Card de Endereço de Entrega */}
      <Card disabled={loading} mode="outlined" style={styles.card}>
        <Card.Title title="Endereço de Entrega" />
        <Card.Content>
          <Paragraph>{`${endereco?.nome_morada}, ${endereco?.designacao}, ${endereco?.bairro}, ${endereco?.ponto_ref}`}</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.confirmButtonContainer}>
        <Button
          disabled={loading}
          loading={loading}
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
