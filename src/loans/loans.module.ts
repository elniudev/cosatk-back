/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { UserModule } from 'src/user/user.module';
import { ArticleModule } from 'src/article/article.module';
import { UsersService } from 'src/user/user.service';
import { ArticlesService } from 'src/article/article.service';
import {UserController} from 'src/user/user.controller'
import { ArticleController } from 'src/article/article.controller';
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { CategorysService } from 'src/category/category.service';
import { CategoryController } from 'src/category/category.controller';



@Module({ 
  imports:[TypeOrmModule.forFeature([Loan]), UserModule, ArticleModule ], 
  controllers: [LoansController],
  providers: [LoansService],
  exports:[LoansService]
})
export class LoansModule {}
