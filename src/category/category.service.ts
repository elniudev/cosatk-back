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

  async updateCategory(idCategory: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where:{
        idCategory
      }
    })
    if(!categoryFound){
      return new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }
    const updateCategory = Object.assign(categoryFound, category)
    return this.categoryRepository.save(updateCategory)
  }

  async deleteCategory(idCategory: number) {
    const result = await this.categoryRepository.delete({idCategory})

    if(result.affected === 0){
      return new HttpException('Category not fount', HttpStatus.NOT_FOUND)
    }
    return result
  }

   // async deleteUser(idUsers: number) {
  //   const result = await this.userRepository.delete({idUsers});

  //   if(result.affected === 0){
  //     return new HttpException('user not fount', HttpStatus.NOT_FOUND)
  //   }
  //   return result
  // }
}
