/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoanDto } from './dto/create-loan.dto';
// import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoansService {
  constructor(@InjectRepository(Loan)private loanRepository:Repository<Loan>){}
  createLoan(loan: CreateLoanDto){
    const newLoan = this.loanRepository.create()
    return this.loanRepository.save(newLoan)
  }

  getLoans() {
    return this.loanRepository.find();
  }

//   findOne(id: number) {
//     return `This action returns a #${id} loan`;
//   }

//   update(id: number, updateLoanDto: UpdateLoanDto) {
//     return `This action updates a #${id} loan`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} loan`;
//   }
}
