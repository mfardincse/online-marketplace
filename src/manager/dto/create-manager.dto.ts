import { IsEmail, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateManagerDto {
  @IsString({ message: 'Name must be string' })
  @Length(3, 30)
  name!: string;

  @IsEmail({}, { message: 'Invalid email' })
  @Transform(({ value }) => value.toLowerCase())
  email!: string;
}