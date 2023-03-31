import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';


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
    })),
    getCategory:jest.fn().mockImplementation(()=>{
      return[{idCategory:'1'}]
    }),
    getCategorys:jest.fn().mockImplementation(()=>{
      return[{category_name:'niño'}]
    }),
    deleteCategory:jest.fn().mockImplementation(()=>{
      return [{idCategory:'1'}]
    })
  
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
    .overrideProvider(CategoryService)
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
  it('should update a category', ()=>{
    const dto = {
      idCategory:0,
      category_name:''
    }
    expect(controller.updateCategory('1', dto)).toEqual({
      idCategory:1,
      ...dto
    })
    expect(mockCategoryService.updateCategory).toHaveBeenCalled();
  })
  it('find a category should retur "category whit idCategory"', async ()=>{
    expect(await mockCategoryService.getCategory('')).toBeTruthy()
  })
  it('should return an array', ()=>{
    expect(mockCategoryService.getCategorys()).toMatchObject([{category_name:'niño'}])
  })
  it('delete (1) should return "deletete whit category"', ()=>{
    expect(mockCategoryService.deleteCategory('1')).toMatchObject([{idCategory:'1'}])
  })
  
});
