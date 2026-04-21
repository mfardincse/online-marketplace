import { IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString({ message: 'Branch name required' })
  branchName!: string;

  @IsString({ message: 'Location required' })
  location!: string;
}