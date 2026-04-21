import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Manager } from './entities/manager.entity';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}