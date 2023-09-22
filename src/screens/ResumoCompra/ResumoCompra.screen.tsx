import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Card, Paragraph, useTheme} from 'react-native-paper';
import {Endereco} from '../../@types/model/endereco.model';
import {
  useAppDispatch,
  useAppSelector,
} from '../../@types/redux/hook/index.hook';
import ConfirmarComponent from '../../Layout/Pagamento/ConfirmarPagamento.component';
import ResumoDeCompra from '../../Layout/Pagamento/ResumoDeCompra.component';
import {EnderecoController} from '../../controller/Endereco/endereco.controller';
import {showToast} from '../../service/toast.service';
import PagamentoScreen from '../MetodoPagamento/MP.screen';
import TransferenciaBancariaScreen from '../TransferenciaBancaria/TransBancaria.screen';

const ResumoCompraScreen: React.FC<any> = ({navigation}) => {
  const theme = useTheme();
  const [endereco, setEndereco] = useState<Partial<Endereco> | undefined>();
  const encomendaData = useAppSelector(state => state.encomenda.encomenda);
  const comprovativo = useAppSelector(state => state.encomenda.comprovativo);
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
      {/* <Text>
      {JSON.stringify(encomendaData)}
      </Text> */}
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

      <ConfirmarComponent navigation={navigation} />
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
