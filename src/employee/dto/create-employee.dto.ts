import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsString({ message: 'Name required' })
  name!: string;

  @IsString({ message: 'Position required' })
  position!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Manager ID must be number' })
  managerId!: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Branch ID must be number' })
  branchId!: number;
}