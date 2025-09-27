import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepresentativesService } from './representatives.service';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';

@Controller('representatives')
export class RepresentativesController {
  constructor(private readonly representativesService: RepresentativesService) {}

  @Post()
  create(@Body() createRepresentativeDto: CreateRepresentativeDto) {
    return this.representativesService.create(createRepresentativeDto);
  }

  @Get()
  findAll() {
    return this.representativesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.representativesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepresentativeDto: UpdateRepresentativeDto) {
    return this.representativesService.update(+id, updateRepresentativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.representativesService.remove(+id);
  }
}
