import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('managers')
export class ManagerController {
  constructor(private readonly service: ManagerService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() dto: CreateManagerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateManagerDto,
  )
   {
    return this.service.update(id, dto);
  }
 @UseGuards(JwtGuard)
  @Patch(':id')
  updateBysomthing(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateManagerDto,
  ) {
    return this.service.updateby(id, dto);
  }
@UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}