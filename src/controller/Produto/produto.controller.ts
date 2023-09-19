import axiosIns from '../../api/axiosIns.api';
import {getUser} from '../../service/storage.service';
import {ProdutoControllerABC} from './model/produto.abc';

export class ProdutoController extends ProdutoControllerABC {
  public getProdutosByCategoria(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await getUser();
        const response = (await axiosIns.get(`/categoria/${id}/${user.id}`))
          .data.data[0];
        this.produtos = response.produtos;
        this.subCategoria = response.subcategorias;
        resolve();
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
}
