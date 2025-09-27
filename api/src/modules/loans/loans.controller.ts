import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto, @ActiveUserId() userId: string) {
    return this.loansService.requestLoan(createLoanDto, userId);
  }

  @Get()
  get( @ActiveUserId() userId: string) {
    return this.loansService.findLoansById( userId);
  }
}
