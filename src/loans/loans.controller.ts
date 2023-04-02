/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
// import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from '../loans/entities/loan.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateLoanDto } from '../loans/dto/update-loan.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/models/role.enum';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  loanService: any;
  constructor(private readonly loansService: LoansService) {}

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  releaseLoan(@Param('id') id: string) {
    return this.loansService.releaseLoanById(+id);
  }  

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:idLoan')
  deleteLoan(@Param('idLoan', ParseIntPipe) idLoan: number) {
    return this.loansService.deleteLoan(idLoan);
  }

  // @Put(':idLoan')
  // updateLoanById(@Param('idLoan') idLoan: number, @Body() loan: UpdateLoanDto) {
  //   return this.loanService.updateLoanById(idLoan, loan);
  // }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:idLoan')
  updateLoan(@Param('idLoan') idLoan: string, @Body() loan:UpdateLoanDto) {
    return this.loansService.updateLoanById(+idLoan, loan);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/checked_out/:id')
  updateCheckedoutLoan(@Param('id') id: string, @Body() newDate:UpdateLoanDto) {
    return this.loansService.updateCheckedoutLoan(+id, newDate);
  }  

  @Get('/userIdUsers/:userId')
  async getLoansByUserId(@Res()res:any, @Param('userId') userId: string) {
    const response = await this.loansService.getLoansByUserId(+userId)
    // return response
    return res.status(HttpStatus.OK).json(response); 
  }

  @Get('/articleIdArticle/:articleIdArticle')
  async getLoanByArticleId(@Res()res:any, @Param('articleIdArticle') articleIdArticle: number) {
    const loan = await this.loansService.getLoanByArticleId(articleIdArticle)
    return res.status(HttpStatus.OK).json(loan); 
  }

  @Get('/status/:status')
  async getLoanWithStatusTrue(@Res()res:any, @Param('status') status: boolean) {
    const loan = await this.loansService.getLoanWithStatusTrue(status)
    return res.status(HttpStatus.OK).json(loan); 
  
  }

  
  @Get('/checked_out')
  async getLoanWithCheckedOutDateExpired(@Res()res:any ) {
    const loan = await this.loansService.getLoansWithCheckedOutExpired()
    return res.status(HttpStatus.OK).json(loan); 
  
  }

}