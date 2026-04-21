import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from './entities/employee.entity';
import { Manager } from '../manager/entities/manager.entity';
import { Branch } from '../branch/entities/branch.entity';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Manager, Branch]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}