import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { CategorysService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategorysService) {}

  @Post('/create')
  async createCategory(@Body() category: CreateCategoryDto) {
    
    return this.categoryService.createCategory(category);
  }

  @Get()
  getCategorys():Promise<Category[]> {
    return this.categoryService.getCategorys();
  }

  @Get('/:idCategory')
  async getCategory(@Res()res:any, @Param('idCategory', ParseIntPipe) idCategory: number) {
    const category = await this.categoryService.getCategory(idCategory)
    return res.status(HttpStatus.OK).json(category); 
  }

  @Put('/:idCategory')
  updateCategory(@Param('idCategory') idCategory: number, @Body() category:UpdateCategoryDto) {
    return this.categoryService.updateCategory(idCategory, category);
  }

  @Delete('/:idCategory')
  deleteCategory(@Param('idCategory', ParseIntPipe) idCategory: number){
    return this.categoryService.deleteCategory(idCategory)
  }
}
 