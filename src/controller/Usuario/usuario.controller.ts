import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {
  AlterarSenhaDto,
  AuthUsuarioDto,
  CreateNovaSenhaDto,
  CreateUsuarioDto,
  RecuperarSenhaDto,
  VerificarCodigoDto,
  updateUtilizadorDto,
} from '../../guards/Dto/usuario.dto';
import {UsuarioControllerABC} from '../../@types/controller/usuario.abc.d';
import {checkErrorContatrainsArrays} from '../../utils/index.utils';
import axiosIns from '../../api/axiosIns.api';
import {Usuario, Utilizador} from '../../@types/model/usuario.model';
import {getUser, removeUser, setUser} from '../../service/storage.service';
import {Asset} from 'react-native-image-picker';

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
      } catch (error: any) {
        reject(error.message || error);
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
      } catch (error: any) {
        reject(error.message || error);
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
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public async verifyIsAuthenticated(): Promise<Utilizador> {
    return new Promise(async (resolve, reject) => {
      try {
        // alert('hey')
        const usuario = await getUser();
        if (!usuario) {
          throw 'Não está autenticado!';
        }
        resolve(usuario);
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public atualizarUsuario(
    usuario: updateUtilizadorDto,
    foto_perfil: Asset,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const Dto = plainToInstance(updateUtilizadorDto, usuario);
        const errors = await validate(Dto);
        if (errors.length > 0) {
          const validationError = checkErrorContatrainsArrays(errors);
          throw `${validationError}`;
        }
        const {id} = await getUser();

        var formData = new FormData();

        const form = {
          id_user: id,
          nome: usuario.nome,
          telemovel: usuario.telefone,
          email: usuario.email,
        };

        if (foto_perfil.fileSize) {
          formData.append('foto_perfil', {
            uri: foto_perfil.uri,
            type: foto_perfil.type, // Adjust the type as per your image type
            name: foto_perfil.fileName, // Adjust the name as per your image name
          });
          const response = (
            await axiosIns.post('/auth/editar-perfil', formData, {
              params: {...form},
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
          ).data;
          if (response.message === 'Não foi possível alterar o dados!') {
            throw response.message;
          }
        } else {
          const response = (
            await axiosIns.post('/auth/editar-perfil', null, {
              params: {...form},
              headers: {
                'content-type':
                  'multipart/form-data; boundary=---011000010111000001101001',
              },
            })
          ).data;
          if (response.message === 'Não foi possível alterar o dados!') {
            throw response.message;
          }
        }
        // await setUser(response.data[0]);
        // await this.verifyIsAuthenticated();
        resolve();
      } catch (error: any) {
        console.log(JSON.stringify(error));
        reject(error.message || error);
      }
    });
  }
  public terminarSessao(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await removeUser();
        resolve();
      } catch (error: any) {
        reject(error);
      }
    });
  }
  public recuperarSenha(telemovel: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const dto = plainToInstance(RecuperarSenhaDto, {telemovel});
        const errors = await validate(dto);
        if (errors.length > 0) {
          const validationError = checkErrorContatrainsArrays(errors);
          throw `${validationError}`;
        }
        const response = (
          await axiosIns.post(
            '/auth/envia-codigo-recuperacao',
            {},
            {params: {telemovel}},
          )
        ).data;
        if (response.message === 'Número de telemovel não verificado') {
          throw response.message;
        }
        console.log(response);
        resolve(response);
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public validarCodigo(validacao: VerificarCodigoDto): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const {codigo} = validacao;
        const Dto = plainToInstance(VerificarCodigoDto, {codigo});
        const errors = await validate(Dto);
        if (errors.length > 0) {
          const validationError = checkErrorContatrainsArrays(errors);
          throw `${validationError}`;
        }
        // console.log(codigo, telemovel);
        const response = (
          await axiosIns.post(
            '/auth/verifica-codigo-recuperacao',
            {},
            {params: validacao},
          )
        ).data;
        if (response.message === 'Código não verificado') {
          throw response.message;
        }
        resolve(response);
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public criarNovaSenha(novaSenha: CreateNovaSenhaDto): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const Dto = plainToInstance(CreateNovaSenhaDto, {...novaSenha});
        const errors = await validate(Dto);
        if (errors.length > 0) {
          const validationError = checkErrorContatrainsArrays(errors);
          throw `${validationError}`;
        }
        // console.log(codigo, telemovel);
        const response = (
          await axiosIns.post(
            '/auth/nova-password',
            {},
            {params: {...novaSenha}},
          )
        ).data;
        console.log(response);
        resolve(response);
      } catch (error: any) {
        // console.error(JSON.stringify(error));
        reject(error.message || error);
      }
    });
  }
  public alterarSenha(utilizadorSenha: AlterarSenhaDto): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const Dto = plainToInstance(AlterarSenhaDto, utilizadorSenha);
        const errors = await validate(Dto);
        if (errors.length > 0) {
          const validationError = checkErrorContatrainsArrays(errors);
          throw `${validationError}`;
        }
        // console.log(codigo, telemovel);
        const {id} = await getUser();
        const response = (
          await axiosIns.post(
            '/auth/altera-password',
            {},
            {params: {...utilizadorSenha, id_user: id}},
          )
        ).data;
        console.log(id);
        if (response.message === 'Falha ao verificar a password') {
          throw response.message;
        }
        resolve(response);
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
}
