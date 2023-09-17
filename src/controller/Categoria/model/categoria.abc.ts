import {CategoriaPrincipal} from '../../../model/categoria.model';

export abstract class CategoriaControllerABC {
  public abstract fetchCategoriaApi(): Promise<any>;
}
