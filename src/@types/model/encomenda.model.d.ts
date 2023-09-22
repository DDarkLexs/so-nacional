import {MeuBaiao} from './usuario.model';

export interface ItensBaio extends Required<Omit<MeuBaiao, 'image'>> {}
export interface Pedido {
  id_endereco: number;
  data_entrega: string;
  hora_entrega: string;
  tipo_pagamento: string | null;
  subtotal: number;
  id_user: number;
  observacao: string;
  taxa_servico: number;
  taxa_entrega: number;
  imposto: number;
  total: number;
  itens: ItensBaio[];
}
export interface EncomendaState {
  comprovativo: Partial<DocumentPickerResponse>;
  loading: boolean;
  encomenda: Pedido;
  encomendas: Encomendas[];
  compra: Partial<MinhasCompra>;
}

export interface Encomendas {
  total: number;
  estado: string;
  id_compra: number;
  id_usuario: number;
  data_compra: string;
}

export interface MinhasCompra
  extends Omit<
    Pedido,
    | 'data_entrega'
    | 'hora_entrega'
    | 'id_user'
    | 'id_endereco'
    | 'taxa_servico'
    | 'observacao'
    | 'tipo_pagamento'
  > {
  total: string;
  estado: string;
  itens: MeuItemCompra[];
  id_compra: number;
  id_usuario: number;
  subtotal: string;
  imposto: string;
  taxa_entrega: string;
  data_compra: string;
}

interface MeuItemCompra {
  preco: number;
  nome_produto: string;
  imagem: string;
  quantidade: number;
}