import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Produto, SubCategoria} from '../../@types/model/produto.model';

interface ProdutoState {
  produtos: Produto[];
  SubCategoria: SubCategoria[];
}

const initialState: ProdutoState = {
  produtos: [],
  SubCategoria: [],
};

const produtoSlice = createSlice({
  name: 'produto',
  initialState,
  reducers: {
    setSubCategoria: (state, action: PayloadAction<SubCategoria[]>) => {
      state.SubCategoria = action.payload;
    },
    setProdutos: (state, action: PayloadAction<Produto[]>) => {
      state.produtos = action.payload;
    },
  },
});

export const {actions} = produtoSlice;
export const {setProdutos, setSubCategoria} = produtoSlice.actions;
export default produtoSlice.reducer;
