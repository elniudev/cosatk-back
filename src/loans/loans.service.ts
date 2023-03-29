import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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

    const user: User | HttpException = await this.userService.getUserById(loan.userIdUsers)        
  
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

  
    const resp = await this.loanRepository.save(newLoan)

    if(resp.idLoan){
      //Switch is_on_loan (article)
      this.articleService.updateOnLoan(+article.idArticle)
      return resp
    }else{
       throw new NotFoundException('Loan failed') 
    }

   
    
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

  if (loanFound.status === true) {
    loanFound.status = false;
 
    await this.articleService.updateOnLoan(loanFound.articleIdArticle)

    await this.loanRepository.save(loanFound);
    return `Loan released correctly.`;
  } else {
    throw new BadRequestException(`Loan with id ${id} not available to release.`);
  }
}


async deleteLoan(idLoan: number){
const result = this.loanRepository.delete({idLoan})

if((await result).affected === 0){
  return new HttpException('loan not found', HttpStatus.NOT_FOUND)
}
return result

}  

async updateCheckedoutLoan(id:number,newDate:UpdateLoanDto){
  const loanFound = await this.loanRepository.findOne({
    where: {idLoan: id},
    relations: ['user','article']
  });

  if (loanFound.status === true) {
    loanFound.checked_out = newDate.checked_out

    await this.loanRepository.save(loanFound);
    return `Loan checked out date updated correctly.`;
  } else {
    throw new BadRequestException(`Loan with id ${id} is not a current loan.`);
  }
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

async getLoansByUserId(userIdUsers: number ): Promise<Loan[] | HttpException> {
  const LoanFound = await this.loanRepository.find({
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
    return new HttpException('loan not found', HttpStatus.NOT_FOUND)
  }
  return LoanFound
} 

async getLoanWithStatusTrue(status: boolean): Promise<Loan[] | HttpException> {
  const LoanWithStatusTrue = await this.loanRepository.find({
    where:{
      status
    },
  })
  if(!LoanWithStatusTrue){
    return new HttpException('no loans found', HttpStatus.NOT_FOUND)
  }
  return LoanWithStatusTrue
}

async getLoansWithCheckedOutExpired(): Promise<Loan[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIsoString = today.toISOString();

  const query = await this.loanRepository.createQueryBuilder('loan')
    .where('loan.checked_out > :today', { today: todayIsoString })
    .getMany();

  return query;
}
}

