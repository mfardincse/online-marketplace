import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

   @UseGuards(JwtGuard)
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
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
@UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.service.update(id, dto);
  }
  
@UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}