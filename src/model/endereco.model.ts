export interface Endereco {
  id_endereco: number;
  id_user: number;
  morada: string;
  designacao: string;
  id_zona: number;
  nome_zona: string;
  bairro: string;
  ponto_ref: string;
  telefone: string;
  taxa_entrega?: number;
  nome_morada?: number;
}
export interface EnderecoDto
  extends Omit<Endereco, 'id_endereco' | 'taxa_entrega' | 'nome_morada'> {}

export interface zonaEntrega {
  nome_zona: string;
  id_zona: number;
}

export interface EnderecoEdit {
  bairro: string;
  designacao: string;
  id_endereco: number;
  id_usuario: number;
  nome_morada: string;
  ponto_ref: string;
  taxa_entrega: string;
  telefone: number;
}
