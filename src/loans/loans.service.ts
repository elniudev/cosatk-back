import { HttpException, HttpStatus } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';
// import { UpdateLoanDto } from './dto/update-loan.dto';


@Injectable()
export class LoansService {

  constructor(
    @InjectRepository(Loan) private loanRepository:Repository<Loan>,
    private articleService: ArticleService,
    private userService: UsersService
  ){}
  async createLoan(loan: CreateLoanDto): Promise<Loan> {
    const article: Article | HttpException = await this.articleService.getArticle(loan.articleIdArticle)
      if (!article) {
        throw new NotFoundException('Article not found')
      }
      if (article.is_on_loan) {
        throw new NotFoundException('Article is already on loan')
      }

    const user = await this.userService.getUserById(loan.userIdUsers)        
  
      if (!user) {
        throw new NotFoundException('User not found')
      }     
    
    const newLoan = new Loan()
    newLoan.deposit = loan.deposit;
    newLoan.fee = loan.fee;
    newLoan.status = loan.status;
    newLoan.checked_in = loan.checked_in;
    newLoan.checked_out = loan.checked_out;
    newLoan.article = article;
    newLoan.user = user;

    //Switch is_on_loan (article)
    this.articleService.updateOnLoan(article.idArticle)
    
    return this.loanRepository.save(newLoan)
    
  }

  async getLoans(): Promise<Loan[]> {
    return this.loanRepository.find({
      relations: ['user','article']
    });
  }

  async getOneLoan(id: number): Promise<Loan> {
    return this.loanRepository.findOne({
    where: {idLoan: id},
    relations: ['user','article']
    });
  }

  async releaseLoanById(id:number){
    const loanFound = await this.loanRepository.findOne({
    where: {idLoan: id},
    relations: ['user','article']
    });
    loanFound.status = false;
    return this.loanRepository.save(loanFound)
    
  }

async deleteLoan(idLoan: number){
const result = this.loanRepository.delete({idLoan})

if((await result).affected === 0){
  return new HttpException('loan not found', HttpStatus.NOT_FOUND)
}
return result

}  

async updateLoanById(idLoan: number, loan: UpdateLoanDto) {

  
  const loanFound = await this.loanRepository.findOne({
    where:{
      idLoan
    },
  })
  if(!loanFound){
    return new  HttpException('Loan not found', HttpStatus.NOT_FOUND)
  }
  const updateLoan = Object.assign(loanFound, loan)
  return this.loanRepository.save(updateLoan)
}

async getLoanByUserId(userIdUsers: number ): Promise<Loan | HttpException> {
  const LoanFound = await this.loanRepository.findOne({
    where:{
      userIdUsers
    },
  })
  if(!LoanFound){
    return new HttpException('User not found', HttpStatus.NOT_FOUND)
  }
  return LoanFound
} 

async getLoanByArticleId(articleIdArticle: number ): Promise<Loan | HttpException> {
  const LoanFound = await this.loanRepository.findOne({
    where:{
      articleIdArticle
    },
  })
  if(!LoanFound){
    return new HttpException('User not found', HttpStatus.NOT_FOUND)
  }
  return LoanFound
} 
}

//   update(id: number, updateLoanDto: UpdateLoanDto) {
//     return `This action updates a #${id} loan`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} loan`;
//   }

