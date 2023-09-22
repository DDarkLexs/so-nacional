import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../@types/redux/hook/index.hook';
import {showToast} from '../../service/toast.service';
import {
  setComprovativo,
  setEncomendaItens,
  setEncomendaProps,
  setLoading,
} from '../../store/reducer/encomenda.reducer';
import {EncomendaController} from '../../controller/encomenda/encomenda.controller';

const ConfirmarComponent: React.FC<any> = ({navigation}) => {
  const theme = useTheme();
  const encomendaData = useAppSelector(state => state.encomenda.encomenda);
  const comprovativo = useAppSelector(state => state.encomenda.comprovativo);
  const loading = useAppSelector(state => state.encomenda.loading);
  const dispatch = useAppDispatch();
  const {postOne} = new EncomendaController();
  const confirmarPagamento = async () => {
    try {
      dispatch(setLoading(true));
      const response = await postOne(encomendaData, comprovativo);
      navigation.navigate('Principal');
      dispatch(
        setEncomendaProps({
          data_entrega: '',
          hora_entrega: '',
          id_endereco: 0,
          id_user: 0,
          imposto: 0,
          observacao: '',
          subtotal: 0,
          taxa_entrega: 0,
          taxa_servico: 0,
          tipo_pagamento: '',
          total: 0,
        }),
      );
      dispatch(setEncomendaItens([]))
      dispatch(setComprovativo({}))
      showToast({
        text1: 'Encomenda enviado!',
        text2: `${response}`,
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return (
    <View style={styles.confirmButtonContainer}>
      <Button
        disabled={loading || (!encomendaData.tipo_pagamento && !!comprovativo)}
        loading={loading}
        mode="contained"
        textColor="white"
        buttonColor={theme.colors.secondary}
        style={styles.confirmButton}
        onPress={confirmarPagamento}>
        Confirmar pagamento
      </Button>
    </View>
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

export default ConfirmarComponent;
