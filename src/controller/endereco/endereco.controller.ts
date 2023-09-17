import {Endereco, EnderecoDto, zonaEntrega} from '../../model/endereco.model';
import {EnderecoControllerABC} from './model/endereco.abc';
import axiosIns from '../../api/axiosIns.api';
import {AxiosError} from 'axios';
import {getUser} from '../../service/storage.service';

export class EnderecoController extends EnderecoControllerABC {
  public getZonas(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = (await axiosIns.get('/zonasentrega')).data.data;
        this.zonasDeEntrega = data;
        resolve();
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public getEnderecoAllByUser(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id} = await getUser();
        const data = (await axiosIns.get(`/enderecos/${id}`)).data.data;
        this.enderecos = data;
        resolve();
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public deleteEndereco(id_endereco: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = (
          await axiosIns.delete(`/delete/endereco/${id_endereco}`)
        ).data;
        console.log(response);
        resolve();
      } catch (error: any) {
        console.log(error);
        reject(error.message || error);
      }
    });
  }
  public saveEndereco(endereco: EnderecoDto): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id} = await getUser();
        const response = (
          await axiosIns.post(
            '/novoendereco',
            {},
            {params: {...endereco, id_user: id}},
          )
        ).data;
        console.log(response);
        resolve();
      } catch (error: any) {
        console.log(error);
        reject(error.message || error);
      }
    });
  }
}
