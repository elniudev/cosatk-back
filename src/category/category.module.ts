import { Module } from '@nestjs/common';
import { CategorysService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategorysService],
  exports:[CategorysService]
})
export class CategoryModule {}
