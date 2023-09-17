import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ArtigoContainer1Screen from '../../Layout/Produto/ArtigoContainer1.component';
import SlideGroupContainer from '../../Layout/Produto/SlideGroupContainer.component';
import {ProdutoController} from '../../controller/Produto/produto.controller';
import {Produto, SubCategoria} from '../../model/produto.model';
import {useAppDispatch, useAppSelector} from '../../store/hook/index.hook';
import {setProdutos} from '../../store/reducer/produto.store';
import {showToast} from '../../service/toast.service';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProdutosScreen: React.FC = (): React.JSX.Element => {
  const categoria = useAppSelector(
    state => state.categoria.categoria_selecionado,
  );
  const controller = new ProdutoController();
  const dispatch = useAppDispatch();
  const produtos: Produto[] = useAppSelector(state => state.produto.produtos);
  const [subCategoria, setSubCategoria] = useState<SubCategoria[]>([]);
  const getSubcategoria = (id: number) => {
    return subCategoria.find(state => state.id_subcategoria === id)?.nome_subcategoria;
  };

  const fetchAPI = async (): Promise<void> => {
    try {
      await controller.getProdutosByCategoria(Number(categoria));
      setSubCategoria(controller.subCategoria);
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
        {produtos.length === 0 ? (
          <SkeletonPlaceholder>
            <View>
              {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={styles.skeletonProductRow}>
                  <View style={styles.skeletonProductSquare} />
                  <View style={styles.skeletonProductSquare} />
                </View>
              ))}
            </View>
          </SkeletonPlaceholder>
        ) : (
          produtos.map(item => (
            <View style={styles.productItem} key={item.id_produto}>
              <ArtigoContainer1Screen
                nome_subcategoria={String(
                  getSubcategoria(item.id_subcategoria),
                )}
                image={item.imagem1}
                nome={item.nome_produto}
                preco={item.preco}
                id_produto={item.id_produto}
              />
            </View>
          ))
        )}
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
    width: '48%',
    marginBottom: 16,
  },
  skeletonProductRow: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  skeletonProductSquare: {
    width: '47%',
    height: 125,
    aspectRatio: 1,
    borderRadius: 8,
  },
});

export default ProdutosScreen;
