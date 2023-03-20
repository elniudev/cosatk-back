/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ArticleModule } from 'src/article/article.module';
import { LoansModule } from 'src/loans/loans.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]), LoansModule, ArticleModule],
  controllers: [UserController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UserModule {}
