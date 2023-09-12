import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index.store';
import {Utilizador} from '../../model/usuario.model';

interface initialStateType {
  utilizador: Utilizador | null;
  isAuthenticated: boolean;
}

const initialState: initialStateType = {
  isAuthenticated: false,
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
  },
});

export const {actions} = userSlice;
export const {setIsAuthenticated, setUtilizador} = userSlice.actions;
export default userSlice.reducer;
