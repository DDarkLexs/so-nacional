import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {AuthUsuarioDto, CreateUsuarioDto} from '../../guards/Dto/usuario.dto';
import {UsuarioControllerABC} from './model/usuario.model';
import {checkErrorContatrainsArrays} from '../../utils/index.utils';
import axiosIns from '../../api/axiosIns.api';
import {Usuario, Utilizador} from '../../model/usuario.model';
import {getUser, removeUser, setUser} from '../../service/storage.service';

export class UsuarioController extends UsuarioControllerABC {
  public autenticar(usuario: AuthUsuarioDto): Promise<Utilizador> {
    return new Promise(async (resolve, reject) => {
      try {
        const usuarioDto = plainToInstance(AuthUsuarioDto, usuario);
        const errors = await validate(usuarioDto);
        if (errors.length > 0) {
          const validationError = checkErrorContatrainsArrays(errors);
          throw `${validationError}`;
        }
        const response = (
          await axiosIns.post('/auth/login', {}, {params: {...usuario}})
        ).data;
        if (response.message === 'Login falhou!') {
          throw response.message;
        }
        await setUser(response.data[0]);
        await this.verifyIsAuthenticated();
        resolve(response.data[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async registar(usuario: CreateUsuarioDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const usuarioDto = plainToInstance(CreateUsuarioDto, usuario);
        const errors = await validate(usuarioDto);
        if (errors.length > 0) {
          const validationError = checkErrorContatrainsArrays(errors);
          throw `${validationError}`;
        }
        const response = (
          await axiosIns.post('/auth/registro', {}, {params: {...usuario}})
        ).data;
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async verificarCodigo(
    codigo: number,
    telemovel: Usuario['telemovel'],
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(codigo, telemovel);
        const response = (
          await axiosIns.post(
            '/auth/verifica-codigo',
            {},
            {params: {codigo, telemovel}},
          )
        ).data;
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async verifyIsAuthenticated(): Promise<Utilizador> {
    return new Promise(async (resolve, reject) => {
      try {
        // alert('hey')
        const usuario = await getUser();
        if (!usuario) {
          throw `Não está autenticado!`;
        }
        resolve(usuario);
      } catch (error) {
        reject(error);
      }
    });
  }
  public terminarSessao(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await removeUser();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
