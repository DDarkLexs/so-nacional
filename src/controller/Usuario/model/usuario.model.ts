import {Usuario, Utilizador} from '../../../model/usuario.model';
import {
  CreateUsuarioDto,
  AuthUsuarioDto,
} from '../../../guards/Dto/usuario.dto';

export abstract class UsuarioControllerABC {
  public abstract autenticar(usuario: AuthUsuarioDto): Promise<Utilizador>;
  public abstract registar(usuario: CreateUsuarioDto): Promise<any>;
  public abstract verificarCodigo(
    codigo: number,
    telemovel: Usuario['telemovel'],
  ): Promise<any>;
  public abstract verifyIsAuthenticated(): Promise<Utilizador>;
  public abstract terminarSessao(): Promise<void>;
}
