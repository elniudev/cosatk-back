/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
// import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('/create')
  async createLoan(@Body() newLoan: CreateLoanDto) {
    return await this.loansService.createLoan(newLoan);
  }

  @Get()
  getLoans():Promise<Loan[]>{ 
    return this.loansService.getLoans();
  }

  @Get(':id')
  getOneLoan(@Param('id') id: string) {
    return this.loansService.getOneLoan(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.loansService.releaseLoanById(+id);
  }  

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
  //   return this.loansService.update(+id, updateLoanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.loansService.remove(+id);
  // }
}
