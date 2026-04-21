import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
    name!: string;

  @IsEmail()
    email!: string;

  @IsString()
    @Length(4, 20)
    password!: string;



}