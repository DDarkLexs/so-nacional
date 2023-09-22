import {MeuBaiao} from './usuario.model';

export interface ItensBaio extends Required<Omit<MeuBaiao, 'image'>> {}
export interface Pedido {
  id_endereco: number;
  data_entrega: string;
  hora_entrega: string;
  tipo_pagamento: string;
  subtotal: number;
  id_user: number;
  observacao: string;
  taxa_servico: number;
  taxa_entrega: number;
  imposto: number;
  total: number;
  itens: ItensBaio[];
}
