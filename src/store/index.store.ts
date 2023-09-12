import {combineReducers, configureStore} from '@reduxjs/toolkit';
import usuarioReducer from './reducer/usuario.reducer';


const reducer = combineReducers({
  usuario: usuarioReducer
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
