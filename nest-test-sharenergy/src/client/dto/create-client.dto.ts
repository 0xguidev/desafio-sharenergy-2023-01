import { IsNotEmpty, IsEmail, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'José Rodrigues Santos',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário a ser criado',
    example: 'kleiton@email.com',
  })
  email: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;
}
