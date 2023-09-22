import {Pedido} from '../model/encomenda.model';

export abstract class EncomendaControllerABC<T extends Pedido> {
  private _encomenda: T[] = [];
  private _encomendaSingular?: T;
  public abstract getAllByIdUser(): Promise<void>;
  public abstract getOne(id_encomenda: number): Promise<void>;
  public abstract postOne(encomenda: T): Promise<void>;
  protected set encomendaSingular(encomenda: T) {
    this._encomendaSingular = encomenda;
  }
  public get encomendaIndividual(): T {
    return Object(this._encomendaSingular);
  }

  protected set encomenda(encomendas: T[]) {
    this._encomenda = encomendas;
  }
  public get encomenda(): T[] {
    return this._encomenda;
  }
}
