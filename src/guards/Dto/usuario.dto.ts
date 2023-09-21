import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  Length,
} from 'class-validator';
import {Usuario, Utilizador} from '../../model/usuario.model';

interface UsuarioDto extends Omit<Usuario, 'id_user'> {}
interface UtilizadorDto extends Omit<Utilizador, 'id' | 'foto'> {}

export class CreateUsuarioDto implements UsuarioDto {
  @IsNotEmpty({message: 'Informe o nome!'})
  nome: string = '';
  @IsNotEmpty()
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  telemovel: string = '';
  @IsNotEmpty({message: 'Informe a senha!'})
  @Length(6, 255, {message: 'A senha deve ser maior ou igual a 6 caracteres!'})
  password: string = '';
}

export class updateUtilizadorDto implements UtilizadorDto {
  @IsNotEmpty({message: 'Informe o nome!'})
  nome: string = '';
  @IsNotEmpty()
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  telefone: string = '';
  @IsEmail({}, {message: 'email inválido!'})
  email: string = '';
}

export class AuthUsuarioDto implements Omit<UsuarioDto, 'nome'> {
  @IsNotEmpty({message: 'Informe o número de telefone'})
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  telemovel: string = '';
  @IsNotEmpty({message: 'Informe a palavra-passe!'})
  @Length(6, 255, {message: 'A sua senha deve ser maior ou igual a 6!'})
  password: string = '';
}
export class RecuperarSenhaDto implements Pick<UsuarioDto, 'telemovel'> {
  @IsNotEmpty({message: 'Informe o número de telefone'})
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  telemovel: string = '';
}

export class VerificarCodigoDto {
  @IsNotEmpty({message: 'Informe o código'})
  @IsNumberString({}, {message: 'O código informado não é numéro!'})
  @Length(4, 20, {message: 'O código informado é inválido!'})
  // @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  codigo: string = '';
}

export class CreateNovaSenhaDto implements Pick<UsuarioDto, 'telemovel'> {
  @IsNotEmpty({message: 'Informe o número de telefone'})
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  telemovel: string = '';
  @IsNotEmpty({message: 'Informe a senha!'})
  @Length(6, 255, {message: 'A senha deve ser maior ou igual a 6 caracteres!'})
  password: string = '';
}

// old_password,new_password,id_user
export class AlterarSenhaDto {
  @Length(6, 255, {message: 'A senha deve ser maior ou igual a 6 caracteres!'})
  @IsNotEmpty({message: 'Informe a senha atual!'})
  old_password: string = '';
  @Length(6, 255, {message: 'A senha deve ser maior ou igual a 6 caracteres!'})
  @IsNotEmpty({message: 'Informe a nova senha!'})
  new_password: string = '';
}
