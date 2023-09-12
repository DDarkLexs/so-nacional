import {IsNotEmpty, IsPhoneNumber, Length} from 'class-validator';
import {Usuario} from '../../model/usuario.model';

interface UsuarioDto extends Omit<Usuario, 'id_user'> {}

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


export class AuthUsuarioDto implements Omit<UsuarioDto, 'nome'> {
  @IsNotEmpty({message: 'Informe o número de telefone'})
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  telemovel: string = '';
  @IsNotEmpty({message: 'Informe a palavra-passe!'})
  @Length(6, 255, {message: 'A sua senha deve ser maior ou igual a 6!'})
  password: string = '';
}
