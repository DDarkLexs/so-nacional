import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {
  EncomendaState,
  Encomendas,
  ItensBaio,
  MinhasCompra,
} from '../../@types/model/encomenda.model';
import {Endereco} from '../../@types/model/endereco.model';

const initialState: EncomendaState = {
  comprovativo: {},
  loading: false,
  encomenda: {
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
    itens: [],
  },
  encomendas: [],
  compra: {
    taxa_entrega: ''
  },
};

const encomendaSlice = createSlice({
  name: 'encomenda',
  initialState,
  reducers: {
    setEncomendaProps: (
      state,
      action: PayloadAction<
        Partial<Omit<EncomendaState['encomenda'], 'itens'>>
      >,
    ) => {
      Object.assign(state.encomenda, {...action.payload});
    },
    setEncomendaInfo: (
      state,
      action: PayloadAction<Partial<Pick<Endereco, 'id_endereco' | 'id_user'>>>,
    ) => {
      Object.assign(state.encomenda, {...action.payload});
    },
    setEncomendas: (state, action: PayloadAction<Encomendas[]>) => {
      state.encomendas = action.payload;
    },
    setEncomendaItens: (state, action: PayloadAction<ItensBaio[]>) => {
      state.encomenda.itens = action.payload;
    },
    setCompra: (state, action: PayloadAction<MinhasCompra>) => {
      Object.assign(state.compra, {...action.payload});
      // state.compra = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setComprovativo: (
      state,
      action: PayloadAction<Partial<DocumentPickerResponse>>,
    ) => {
      state.comprovativo = action.payload;
    },
    // setSelectedCategoria: (state, action: PayloadAction<number>) => {
    //   state.categoria_selecionado = action.payload;
    // },
  },
});

export const {actions} = encomendaSlice;
export const {
  setEncomendaItens,
  setEncomendaInfo,
  setComprovativo,
  setEncomendaProps,
  setLoading,
  setEncomendas,
  setCompra,
} = encomendaSlice.actions;
export default encomendaSlice.reducer;
