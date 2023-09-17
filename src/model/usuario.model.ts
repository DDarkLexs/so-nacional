import {Produto} from './produto.model';

export interface Usuario {
  id_user: number;
  nome: string;
  telemovel: string;
  password: string;
}

export interface Utilizador {
  id: number;
  foto: string;
  nome: string;
  telefone: string;
  email: string;
}

export interface MeuBaiao
  extends Pick<Produto, 'id_produto' | 'preco' | 'nome_produto'> {
  subtotal: number;
  quantidade: number;
  image?: string;
}

export interface ItensBaio extends Required<Omit<MeuBaiao, 'image'>> {}
interface Pedido {
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


