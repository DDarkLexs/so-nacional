import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Endereco} from '../../@types/model/endereco.model';

interface EnderecoState {
  endereco: Endereco[];
}

const initialState: EnderecoState = {
  endereco: [],
};

const enderecoSlice = createSlice({
  name: 'endereco',
  initialState,
  reducers: {
    setEndereco: (state, action: PayloadAction<Endereco[]>) => {
      state.endereco = action.payload;
    },
  },
});

export const {actions} = enderecoSlice;
export const {setEndereco} = enderecoSlice.actions;
export default enderecoSlice.reducer;
