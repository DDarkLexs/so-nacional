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
