import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Card, List, Divider, useTheme, Text} from 'react-native-paper';
import ArtigoContainer2 from '../../Layout/Produto/ArtigoContainer2.component';
import {Encomendas} from '../../@types/model/encomenda.model';
import {showToast} from '../../service/toast.service';
import {
  useAppDispatch,
  useAppSelector,
} from '../../@types/redux/hook/index.hook';
import {EncomendaController} from '../../controller/encomenda/encomenda.controller';
import {setCompra} from '../../store/reducer/encomenda.reducer';
import {fazerSubtotal} from '../../utils/index.utils';
import ArtigoContainer3Component from '../../Layout/Produto/ArtigoContainer3.component';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

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
      <View>
        {/* <Text>
          {JSON.stringify(data.itens)}
        </Text> */}
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
