import {combineReducers, configureStore} from '@reduxjs/toolkit';
import usuarioReducer from './reducer/usuario.reducer';
import categoriaReducer from './reducer/categoria.store';
import produtoReducer from './reducer/produto.store';
import enderecoSlice from './reducer/endereco.store';
import encomendaSlice from './reducer/encomenda.store';

const reducer = combineReducers({
  usuario: usuarioReducer,
  categoria: categoriaReducer,
  produto: produtoReducer,
  endereco: enderecoSlice,
  encomenda: encomendaSlice,
});
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
