import {
  Endereco,
  EnderecoDto,
  zonaEntrega,
} from '../../../@types/model/endereco.model';
import {Usuario} from '../../../@types/model/usuario.model';

export abstract class EnderecoControllerABC {
  private _zonasDeEntrega: zonaEntrega[] = [];
  private _enderecos: Endereco[] = [];

  public abstract getZonas(): Promise<void>;
  public abstract saveEndereco(endereco: EnderecoDto): Promise<void>;
  public abstract getEnderecoAllByUser(): Promise<void>;
  public abstract deleteEndereco(
    id_endereco: Endereco['id_endereco'],
  ): Promise<void>;

  public get zonasDeEntrega(): zonaEntrega[] {
    return this._zonasDeEntrega;
  }
  protected set zonasDeEntrega(zonaDeEntregas: zonaEntrega[]) {
    this._zonasDeEntrega = zonaDeEntregas;
  }

  public get enderecos(): Endereco[] {
    return this._enderecos;
  }
  protected set enderecos(enderecos: Endereco[]) {
    this._enderecos = enderecos;
  }
}
