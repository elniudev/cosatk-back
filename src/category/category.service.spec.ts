import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Category } from '../category/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';


describe('CategoryService', () => {
  let service: CategoryService;

  

  const mockCategoryRepository = {
    // create: jest.fn().mockImplementation(dto => dto),
    // save:jest
    // .fn()
    // .mockImplementation((category)=> 
    // Promise.resolve({id:Date.now(), ...category})), 
    
    
    find:jest.fn().mockImplementation(()=>{
      return[{category_name: 'niños'}]
    })



  }
  
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,
      //   {

      //   provide:getRepositoryToken(Article),
      //   useValue:{mockArticleRepository}
      // },
        {
                
        provide:getRepositoryToken(Category),
        useValue:{mockCategoryRepository}
      }
   
  ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should crate a new category record and return that', async ()=>{
    const createCategory:CreateCategoryDto = {
      category_name: 'niño'
    }
    // expect(await service.createCategory(createCategory)).toMatchObject({
    //   idCategory:expect.any(Number),...createCategory
    // })
    
    // toEqual({id: expect.any(Number),category_name: 'niños'})
  })

  it('should return an array', async ()=>{
    expect(await service.getCategorys()).toMatchObject([{category_name: 'niños'}])
  })
});







// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Loan } from '../loans/entities/loan.entity';
// import { Repository } from 'typeorm';
// import { Article } from '../article/entities/article.entity';
// import { CategorysService } from './category.service';
// import { Category } from '../category/entities/category.entity';
// import { User } from '../user/entities/user.entity';



// describe('CategoryService', () => {
//   let service: CategorysService;
//   let categoryRepository:Repository<Category>
//   let userRepository:Repository<User>
//   let loanRepository:Repository<Loan>
//   let articleRepositpory:Repository<Article>

//   const mockCategoryRepository = {
    
//    create: jest.fn().mockImplementation(dto =>dto), 
//     save:jest.fn().mockImplementation(newCategory =>Promise.resolve({id:Date.now(), ...newCategory}))
//   }
//   const mockArticleRepository= {

//   }
//   const mockLoanRepository ={

//   }
//   const mockUserRepository = {

//   }



//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CategorysService,{
//       provide:getRepositoryToken(Article),
//       useValue:{mockArticleRepository}
//     },
//     {
//       provide:getRepositoryToken(Loan),
//       useValue:{mockLoanRepository}
//     },
//     {
//       provide:getRepositoryToken(User),
//       useValue:{mockUserRepository}
//     },
//     {
//       provide:getRepositoryToken(Category),
//       useValue:{mockCategoryRepository}
//     }
   
//   ],
//     }).compile();

//     service = module.get<CategorysService>(CategorysService);
//     categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category))
//     userRepository = module.get<Repository<User>>(getRepositoryToken(User))
//     loanRepository = module.get<Repository<Loan>>(getRepositoryToken(Loan))
//     articleRepositpory = module.get<Repository<Article>>(getRepositoryToken(Article))
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
//   it('should crate a new category record and return that', async ()=>{
//     expect(await service.createCategory({category_name:'niños'})).toBeTruthy()
//   })
// });
