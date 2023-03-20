import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategorysService } from './category.service';


describe('CategoryController', () => {
  let controller: CategoryController;
  const mockCategoryService = {
    createCategory: jest.fn(dto=>{
        return{
          id:Date.now(),
          ...dto
        };
    }),
    updateCategory:jest.fn((idCategory, dto)=>({
      idCategory, 
      ...dto
    }))
  
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategorysService],
    })
    .overrideProvider(CategorysService)
    .useValue(mockCategoryService)
    .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a category', ()=>{
    const dto = {
      idCategory:0,
      category_name:''
    }
    expect(controller.createCategory(dto)).toBeTruthy()
      expect(mockCategoryService.createCategory).toHaveBeenCalledWith(dto)
  })
  it('shoul update a category', ()=>{
    const dto = {
      idCategory:0,
      category_name:''
    }
    expect(controller.updateCategory(1, dto)).toEqual({
      idCategory:1,
      ...dto
    })
    expect(mockCategoryService.updateCategory).toHaveBeenCalled();
  })
  
});
