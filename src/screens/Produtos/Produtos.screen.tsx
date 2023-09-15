import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import ArtigoContainer1Screen from '../../Layout/Produto/ArtigoContainer1.component';
import SlideGroupContainer from '../../Layout/Produto/SlideGroupContainer.component';
import { ProdutoController } from '../../controller/Produto/produto.controller';
import { Produto } from '../../model/produto.model';
import { useAppDispatch, useAppSelector } from '../../store/hook/index.hook';
import { setProdutos } from '../../store/reducer/produto.store';
import { showToast } from '../../service/toast.service';

const ProdutosScreen: React.FC = (): React.JSX.Element => {
  const categoria = useAppSelector(
    state => state.categoria.categoria_selecionado,
  );
  const controller = new ProdutoController();
  const dispatch = useAppDispatch();
  const produtos: Produto[] = useAppSelector(state => state.produto.produtos);

  const fetchAPI = async (): Promise<void> => {
    try {
      await controller.getProdutosByCategoria(Number(categoria));
      dispatch(setProdutos(controller.produtos));
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'bottom',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (categoria) {
      dispatch(setProdutos([]));
      fetchAPI();
    }
  }, [categoria]);

  return (
    <ScrollView style={styles.container}>
      <SlideGroupContainer />
      <View style={styles.productGrid}>
        {produtos.map(item => (
          <View style={styles.productItem} key={item.id_produto}>
            <ArtigoContainer1Screen
              image={item.imagem1}
              nome={item.nome_produto}
              preco={item.preco}
              id_produto={item.id_produto}
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
    padding: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%', // 48% to leave space for 2 columns with a small gap
    marginBottom: 16,
  },
  // ... other styles ...
});

export default ProdutosScreen;
