import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';


describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    create: jest.fn().mockImplementation(dto=>dto),
    save: jest.fn().mockImplementation((category)=>{
      return Promise.resolve({id:Date.now(), ...category})
    } 
    ), 
    find:jest.fn().mockImplementation(()=>{
      return[{category_name: 'niños'}]
    }),
    findOne: jest.fn().mockImplementation(()=>{
      return[{id:'2'}]
    }),
    updateCategory: jest.fn().mockImplementation(()=>{
       return[{id:'2'}]
    }),
    delete: jest.fn().mockImplementation(()=>{
      return[{id:'2'}]
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,
        {       
        provide:getRepositoryToken(Category),
        useValue:mockCategoryRepository
      }
  ]
    }).compile();
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should crate a new category record and return that', async ()=>{
    const newCategory:CreateCategoryDto = {
      category_name: 'niño'}
    expect(await service.createCategory(newCategory)).toMatchObject({
      id:expect.any(Number),...newCategory
    })
  })

  it('should return an array', async ()=>{
    expect(await service.getCategorys()).toMatchObject([{category_name: 'niños'}])
  })

  it('find a category should return "find category whit id"', async ()=>{
    expect(await service.getCategory(1)).toMatchObject([{id:'2'}])
  })

  it('update category ("2", {category_name: "niño"}) should return the category_name', async() =>{
    const categoryUpdate = {category_name: "niño"}
    expect(await service.updateCategory(1, categoryUpdate)).toBeTruthy()
    // toMatchObject([{id:'2'}])
  })
  it('delete (2) sould return "delete whit category"', async ()=>{
    expect(await service.deleteCategory(2)).toMatchObject(([{id:'2'}]))
  })
});


