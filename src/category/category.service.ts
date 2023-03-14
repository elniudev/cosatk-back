import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategorysService {
constructor(@InjectRepository(Category)private categoryRepository:Repository<Category>){}


  async createCategory(category: CreateCategoryDto){
    const newCategory = await this.categoryRepository.create(category)
    return this.categoryRepository.save(newCategory)
}

  getCategorys() {
    return this.categoryRepository.find();
  }

  async getCategory(idCategory: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where:{
        idCategory
      }
    });
    if(!categoryFound){
      return new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }
    return categoryFound;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
