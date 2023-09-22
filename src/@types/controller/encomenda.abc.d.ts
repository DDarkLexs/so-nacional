import {EncomendaState, Encomendas, MinhasCompra, Pedido} from '../model/encomenda.model';

export abstract class EncomendaControllerABC {
  private _encomenda: Encomendas[] = [];
  private _compra: MinhasCompra;
  public abstract getAllByIdUser(): Promise<void>;
  public abstract getOne(id_encomenda: number): Promise<void>;
  public abstract postOne(
    encomenda: Pedido,
    comprovativo: EncomendaState['comprovativo'],
  ): Promise<string>;
  protected set encomenda(encomendas: Encomendas) {
    this._encomenda = encomendas;
  }
  public get encomenda(): Encomendas[] {
    return this._encomenda;
  }
  protected set compra(item: MinhasCompra) {
    this._compra = item;
  }
  public get compra(): MinhasCompra {
    return this._compra;
  }
}
