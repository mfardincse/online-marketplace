import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './entities/employee.entity';
import { Manager } from '../manager/entities/manager.entity';
import { Branch } from '../branch/entities/branch.entity';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,

    @InjectRepository(Manager)
    private managerRepo: Repository<Manager>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
  ) {}

  //CREATE with relation (FIXED)
  async create(dto: CreateEmployeeDto) {
    const manager = await this.managerRepo.findOneBy({
      id: dto.managerId,
    });

    const branch = await this.branchRepo.findOneBy({
      id: dto.branchId,
    });

    const employee = this.employeeRepo.create({
      name: dto.name,
      position: dto.position,
      manager: manager ?? null,
      branch: branch ?? null,
    });

    return this.employeeRepo.save(employee);
  }

  // GET ALL
  findAll() {
    return this.employeeRepo.find({
      relations: ['manager', 'branch'],
    });
  }

  //GET ONE
  findOne(id: number) {
    return this.employeeRepo.findOne({
      where: { id },
      relations: ['manager', 'branch'],
    });
  }

  //UPDATE
  async update(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ['manager', 'branch'],
    });

    if (!employee) {
      return { message: 'Employee not found' };
    }

    if (dto.managerId) {
      const manager = await this.managerRepo.findOneBy({
        id: dto.managerId,
      });
      employee.manager = manager ?? null;
    }

    if (dto.branchId) {
      const branch = await this.branchRepo.findOneBy({
        id: dto.branchId,
      });
      employee.branch = branch ?? null;
    }

    if (dto.name) employee.name = dto.name;
    if (dto.position) employee.position = dto.position;

    return this.employeeRepo.save(employee);
  }

  //DELETE
  remove(id: number) {
    return this.employeeRepo.delete(id);
  }
}