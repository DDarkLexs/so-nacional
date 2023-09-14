import axiosIns from '../../api/axiosIns.api';
import {CategoriaPrincipal} from '../../model/categoria.model';
import {CategoriaControllerABC} from './model/categoria.model';

export class CategoriaController extends CategoriaControllerABC {
  public fetchCategoriaApi(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = (await axiosIns.get('/principal')).data;
        resolve(response);
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
}
