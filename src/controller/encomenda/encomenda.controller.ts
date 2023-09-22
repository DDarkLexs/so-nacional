import {DocumentPickerResponse} from 'react-native-document-picker';
import {EncomendaControllerABC} from '../../@types/controller/encomenda.abc.d';
import {Pedido} from '../../@types/model/encomenda.model';
import axiosIns from '../../api/axiosIns.api';
import {getUser} from '../../service/storage.service';

export class EncomendaController extends EncomendaControllerABC {
  public getAllByIdUser(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id} = await getUser();
        const response = (await axiosIns.get(`/encomendas/${id}`, {})).data
          .data;
        this.encomenda = response;
        resolve();
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public getOne(id_compra: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = (await axiosIns.get(`encomenda/${id_compra}`)).data
          .data[0];
        this.compra = response;
        resolve();
      } catch (error: any) {
        reject(error.message || error);
      }
    });
  }
  public postOne(
    encomenda: Pedido,
    comprovativo: DocumentPickerResponse,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        /*
         */
        // const dadosCompra = encomenda;

        const {id} = await getUser();
        const dadosCompra = {
          ...encomenda,
          id_user: id,
          data_entrega: new Date().toISOString().split('T')[0],
          hora_entrega: new Date().toISOString().split('T')[1],
        };
        const formdata = new FormData();
        formdata.append('comprovativo', {
          uri: comprovativo.uri,
          type: comprovativo.type,
          name: comprovativo.name,
        });
        formdata.append('dadosCompra', JSON.stringify(dadosCompra));

        // console.log(encomenda);
        const response = (
          await axiosIns.post('/checkout/finalizar', formdata, {
            //   params: {...encomenda, id_user: id},
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        ).data;

        // console.log(response.message);
        resolve(response.message);
      } catch (error: any) {
        // console.log(JSON.stringify(error));
        const msg = error.message || error;
        reject(msg);
      }
    });
  }
}
