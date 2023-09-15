import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {MeuBaiao, Utilizador} from '../../model/usuario.model';
import type {Produto} from '../../model/produto.model';
import {fazerSubtotal} from '../../utils/index.utils';

interface initialStateType {
  utilizador: Utilizador | null;
  itens: MeuBaiao[];
  isAuthenticated: boolean;
}

const initialState: initialStateType = {
  isAuthenticated: false,
  itens: [],
  utilizador: null,
};

const userSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    setUtilizador: (state, action: PayloadAction<Utilizador | null>) => {
      state.utilizador = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setItem: (state, action: PayloadAction<MeuBaiao>) => {
      state.itens.push(action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<
        Pick<MeuBaiao, 'preco' | 'quantidade'> & {index: number}
      >,
    ) => {
      const {index, preco, quantidade} = action.payload;
      state.itens[index].quantidade = quantidade;
      state.itens[index].subtotal = fazerSubtotal(preco, quantidade);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.itens.splice(action.payload, 1);
      // state.itens.push(action.payload);
    },
  },
});

export const {actions} = userSlice;
export const {
  setIsAuthenticated,
  setUtilizador,
  setItem,
  removeItem,
  updateItem,
} = userSlice.actions;
export default userSlice.reducer;
