import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Manager } from './entities/manager.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private managerRepo: Repository<Manager>,
  ) {}

  create(dto: CreateManagerDto) {
    const manager = this.managerRepo.create(dto);
    return this.managerRepo.save(manager);
  }

  findAll() {
    return this.managerRepo.find({
      relations: ['employees'],
    });
  }

  findOne(id: number) {
    return this.managerRepo.findOne({
      where: { id },
      relations: ['employees'],
    });
  }

  update(id: number, dto: UpdateManagerDto) {
    return this.managerRepo.update(id, dto);
  }
  async updateby(id: number, dto: UpdateManagerDto) {
    const manager = await this.managerRepo.findOneBy({ id });

    if (!manager) {
      return { message: 'Manager not found' };
    }

    Object.assign(manager, dto);

    return this.managerRepo.save(manager);
  }

  remove(id: number) {
    return this.managerRepo.delete(id);
  }
}