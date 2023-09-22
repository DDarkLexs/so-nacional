import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {CategoriaPrincipal} from '../../@types/model/categoria.model.d';
import {ItensBaio, Pedido} from '../../@types/model/encomenda.model.d';
import {Endereco} from '../../@types/model/endereco.model';
import {DocumentPickerResponse} from 'react-native-document-picker';

interface EncomendaState {
  comprovativo: Partial<DocumentPickerResponse>;
  loading: boolean;
  encomenda: Pedido;
}

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
    setEncomendaItens: (state, action: PayloadAction<ItensBaio[]>) => {
      state.encomenda.itens = action.payload;
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
} = encomendaSlice.actions;
export default encomendaSlice.reducer;
