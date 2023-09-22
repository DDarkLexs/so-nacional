import axiosIns from '../../api/axiosIns.api';
import {CategoriaPrincipal} from '../../@types/model/categoria.model';
import {CategoriaControllerABC} from '../../@types/controller/categoria.abc.d';

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
