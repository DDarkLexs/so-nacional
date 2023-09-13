import {Categoria} from '../../../model/categoria.model';
import {Produto, SubCategoria} from '../../../model/produto.model';

export abstract class ProdutoControllerABC {
  private _subCategoria: SubCategoria[] = [];
  private _produtos: Produto[] = [];
  public abstract getProdutosByCategoria(id: number): Promise<void>;
  protected set produtos(produtos: Produto[]) {
    this._produtos = produtos;
  }
  public get produtos(): Produto[] {
    return this._produtos;
  }
  protected set subCategoria(produtos: SubCategoria[]) {
    this._subCategoria = produtos;
  }
  get subCategoria(): SubCategoria[] {
    return this._subCategoria;
  }
}
