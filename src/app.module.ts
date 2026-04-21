/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable no-irregular-whitespace */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagerModule } from './manager/manager.module';
import { EmployeeModule } from './employee/employee.module';
import { BranchModule } from './branch/branch.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    // TYPEORM MODULE

 TypeOrmModule.forRoot({

      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',      
      password: '12345',
      database: 'mid_project_db',  
      autoLoadEntities: true,
      synchronize: true,        

    }),
    AuthModule,
    ManagerModule,
    EmployeeModule,
    BranchModule,
  ],
})
export class AppModule {}