import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {CategoriaPrincipal} from '../../model/categoria.model';
import {ItensBaio, Pedido} from '../../model/encomenda.model';
import {Endereco} from '../../model/endereco.model';

interface EncomendaState {
  encomenda: Pedido;
}

const initialState: EncomendaState = {
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
    setEncomendaInfo: (
      state,
      action: PayloadAction<Partial<Pick<Endereco, 'id_endereco' | 'id_user'>>>,
    ) => {
      Object.assign(state.encomenda, {...action.payload});
    },
    setEncomendaItens: (state, action: PayloadAction<ItensBaio[]>) => {
      state.encomenda.itens = action.payload;
    },
    // setSelectedCategoria: (state, action: PayloadAction<number>) => {
    //   state.categoria_selecionado = action.payload;
    // },
  },
});

export const {actions} = encomendaSlice;
export const {setEncomendaItens, setEncomendaInfo} = encomendaSlice.actions;
export default encomendaSlice.reducer;
