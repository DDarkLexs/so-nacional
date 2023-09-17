import {IsEmail, IsNotEmpty, IsPhoneNumber, Length} from 'class-validator';
import {Usuario, Utilizador} from '../../model/usuario.model';

interface UsuarioDto extends Omit<Usuario, 'id_user'> {}
interface UtilizadorDto extends Omit<Utilizador, 'id' | 'foto'> {}

export class CreateUsuarioDto implements UsuarioDto {
  @IsNotEmpty({message: 'Informe o nome!'})
  nome: string = '';
  @IsNotEmpty()
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  telemovel: string = '';
  @IsNotEmpty({message: 'Informe a palavra-passe!'})
  @Length(6, 255, {message: 'A sua senha deve ser maior ou igual a 6!'})
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
