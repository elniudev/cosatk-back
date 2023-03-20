import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategorysService } from './category.service';
import { Category } from './entities/category.entity';


describe('CategoryService', () => {
  let service: CategorysService;

  const mockCategoryRepository = {
    
   create: jest.fn().mockImplementation(dto =>dto), 
    save:jest.fn().mockImplementation(newCategory =>Promise.resolve({id:Date.now(), ...newCategory}))
  }



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorysService, {
        provide:getRepositoryToken(Category),
        useValue:{mockCategoryRepository}
      }],
    }).compile();

    service = module.get<CategorysService>(CategorysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should crate a new category record and return that', async ()=>{
    expect(await service.createCategory({category_name:'niños'})).toBeTruthy()
  })
});
