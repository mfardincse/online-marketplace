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

import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UseGuards } from '@nestjs/common'; 

@Controller('branches')
export class BranchController {
  constructor(private readonly service: BranchService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() dto: CreateBranchDto) {
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
    @Body() dto: UpdateBranchDto,
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id')
  updateBysomthing(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBranchDto,
  ) {
    return this.service.updateby(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}