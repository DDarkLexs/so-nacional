import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import ArtigoContainer1Screen from '../../components/Artigo/ArtigoContainer1.component';
import SlideGroupContainer from '../../components/Artigo/SlideGroupContainer.component';
import {ProdutoController} from '../../controller/Produto/produto.controller';
import {Produto} from '../../model/produto.model';
import {useAppDispatch, useAppSelector} from '../../store/hook/index.hook';
import {setProdutos} from '../../store/reducer/produto.store';
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
      // dispatch(setProdutos())
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
    // console.log('ok:' + categoria);
  }, [categoria]);

  return (
    <ScrollView style={styles.container}>
      <SlideGroupContainer />
      {produtos.map(item => (
        <ArtigoContainer1Screen
          image={item.imagem1}
          nome={item.nome_produto}
          preco={item.preco}
          key={item.id_produto}
          id_produto={item.id_produto}

        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: 'auto',
  },
  card: {
    marginBottom: 16,
    padding: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    alignContent: 'center',
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: 'auto',
    height: 150,
    resizeMode: 'cover',
  },
  imageContainer: {
    justifyContent: 'center',
    // alignItems:'center'
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 17,
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 140,
    textAlign: 'center',
  },
  checkoutButtonContainer: {
    marginTop: 16, // Espaçamento superior para separar o botão do carrinho
  },
});

export default ProdutosScreen;
