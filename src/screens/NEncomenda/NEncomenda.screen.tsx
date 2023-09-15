import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Card, List, Divider, useTheme} from 'react-native-paper';
import ArtigoContainer2 from '../../Layout/Produto/ArtigoContainer2.component';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const NEncomendaScreen = () => {
  const timelineData = [
    {status: 'Confirmado', time: '10:00 AM'},
    {status: 'Em preparação', time: '11:30 AM'},
    {status: 'A caminho', time: '1:00 PM'},
    {status: 'Encomenda Entregue', time: '2:30 PM'},
  ];

  const theme = useTheme();
  const [products, setProducts] = React.useState<Product[]>([
    {
      id: 1,
      name: 'Produto 1',
      price: 19.99,
      imageUrl: require('../../assets/image/fruits/banana.png'),
      quantity: 99,
    },
    {
      id: 2,
      name: 'Produto 2',
      price: 29.99,
      imageUrl: require('../../assets/image/fruits/banana.png'),
      quantity: 2,
    },
    {
      id: 3,
      name: 'Produto 3',
      price: 23.99,
      imageUrl: require('../../assets/image/fruits/banana.png'),
      quantity: 5,
    },
    {
      id: 4,
      name: 'Produto 4',
      price: 29.99,
      imageUrl: require('../../assets/image/fruits/banana.png'),
      quantity: 1,
    },
    // Adicione mais produtos conforme necessário
  ]);

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
                          backgroundColor: index === 0 ? 'green' : '#808080', // You can customize the color
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
        {products.map((product, i) => (
          <ArtigoContainer2
            key={i}
            id_produto={1}
            nome_produto="teste"
            preco={0}
            index={i}
            image={product.imageUrl}
            quantidade={0}
            subtotal={0}
          />
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
