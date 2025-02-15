import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Divider, List, useTheme} from 'react-native-paper';
import {Encomendas} from '../../@types/model/encomenda.model.d';
import {
  useAppDispatch,
  useAppSelector,
} from '../../@types/redux/hook/index.hook';
import ArtigoContainer3Component from '../../Layout/Produto/ArtigoContainer3.component';
import {EncomendaController} from '../../controller/Encomenda/encomenda.controller';
import {showToast} from '../../service/toast.service';
import {setCompra} from '../../store/reducer/encomenda.reducer';
import {fazerSubtotal} from '../../utils/index.utils';
import DadosResumoDeCompra from '../../Layout/Encomendas/Resumo.component';

const NEncomendaScreen: React.FC<any> = ({
  navigation,
  route,
}): React.JSX.Element => {
  const {id_compra}: Pick<Encomendas, 'id_compra'> = route.params;
  const theme = useTheme();
  const timelineData = [
    {status: 'Confirmado', value: 'Confirmado'},
    {status: 'Em preparação', value: 'Em preparação'},
    {status: 'A caminho', value: 'A caminho'},
    {status: 'Encomenda Entregue', value: 'Encomenda Entregue'},
  ];
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.encomenda.compra);
  const compra: any = useAppSelector(state => state.encomenda.compra);
  const controller = new EncomendaController();
  const fetchData = async () => {
    try {
      await controller.getOne(id_compra);
      dispatch(setCompra(controller.compra));
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, [id_compra]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card mode="outlined">
          <Card.Content>
            <List.Section>
              {timelineData.map((item, index) => (
                <View key={index}>
                  <List.Item
                    title={item.status}
                    left={() => (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          backgroundColor:
                            data.estado == item.status ? 'green' : '#808080', // You can customize the color
                        }}
                      />
                    )}
                  />
                </View>
              ))}
            </List.Section>
          </Card.Content>
          <Divider />
        </Card>
      </View>
      <DadosResumoDeCompra compra={compra} />
      <View>
        {data.itens?.map((item, i) => (
          <View key={i}>
            <ArtigoContainer3Component
              id_produto={i}
              index={i}
              nome_produto={item.nome_produto}
              preco={item.preco}
              quantidade={item.quantidade}
              image={item.imagem}
              subtotal={fazerSubtotal(item.preco, item.quantidade)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default NEncomendaScreen;
