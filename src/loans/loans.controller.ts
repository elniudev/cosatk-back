/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
// import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('/create')
  createLoan(@Body() newLoan: CreateLoanDto) {
    return this.loansService.createLoan(newLoan);
  }

  @Get()
  getLoans():Promise<Loan[]>{ 
    return this.loansService.getLoans();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.loansService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
  //   return this.loansService.update(+id, updateLoanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.loansService.remove(+id);
  // }
}
