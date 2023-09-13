import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {CategoriaPrincipal} from '../../model/categoria.model';

interface Categoria {
  categoriaPrincipal: CategoriaPrincipal[];
  categoria_selecionado: number | null;
  //   utilizador: ;
}

const initialState: Categoria = {
  categoriaPrincipal: [],
  categoria_selecionado: null,
};

const categoriaSlice = createSlice({
  name: 'categoria',
  initialState,
  reducers: {
    setCategoriaPrincipal: (
      state,
      action: PayloadAction<CategoriaPrincipal[]>,
    ) => {
      state.categoriaPrincipal = action.payload;
    },
    setSelectedCategoria: (state, action: PayloadAction<number>) => {
      state.categoria_selecionado = action.payload;
    },
  },
});

export const {actions} = categoriaSlice;
export const {setCategoriaPrincipal, setSelectedCategoria} =
  categoriaSlice.actions;
export default categoriaSlice.reducer;
