import {Usuario, Utilizador} from '../../../model/usuario.model';
import {
  CreateUsuarioDto,
  AuthUsuarioDto,
  updateUtilizadorDto,
  CreateNovaSenhaDto,
  VerificarCodigoDto,
} from '../../../guards/Dto/usuario.dto';

export abstract class UsuarioControllerABC {
  public abstract autenticar(usuario: AuthUsuarioDto): Promise<Utilizador>;
  public abstract registar(usuario: CreateUsuarioDto): Promise<any>;
  public abstract atualizarUsuario(
    usuario: updateUtilizadorDto,
    foto_perfil: any,
  ): Promise<void>;
  public abstract verificarCodigo(
    codigo: number,
    telemovel: Usuario['telemovel'],
  ): Promise<any>;
  public abstract verifyIsAuthenticated(): Promise<Utilizador>;
  public abstract terminarSessao(): Promise<void>;
  public abstract recuperarSenha(telemovel: string): Promise<void>;
  public abstract validarCodigo(validacao: VerificarCodigoDto): Promise<void>;
  public abstract criarNovaSenha(novaSenha: CreateNovaSenhaDto): Promise<void>;
}
