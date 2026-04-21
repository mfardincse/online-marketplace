import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
  ) {}

  create(dto: CreateBranchDto) {
    const branch = this.branchRepo.create(dto);
    return this.branchRepo.save(branch);
  }

  findAll() {
    return this.branchRepo.find({
      relations: ['employees'],
    });
  }

  findOne(id: number) {
    return this.branchRepo.findOne({
      where: { id },
      relations: ['employees'],
    });
  }

 
  update(id: number, dto: UpdateBranchDto) {
    return this.branchRepo.update(id, dto);
  }

  async updateby(id: number, dto: UpdateBranchDto) {
  const branch = await this.branchRepo.findOneBy({ id });

  if (!branch) {
    return { message: 'Branch not found' };
  }

  Object.assign(branch, dto);

  return this.branchRepo.save(branch);
}


  remove(id: number) {
    return this.branchRepo.delete(id);
  }
}