/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { UserModule } from '../user/user.module';
import { ArticleModule } from './../article/article.module';

@Module({ 
  imports:[TypeOrmModule.forFeature([Loan]), UserModule, ArticleModule ], 
  controllers: [LoansController],
  providers: [LoansService],
  exports:[LoansService]
})
export class LoansModule {}
