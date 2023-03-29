import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/user/user.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { LoansService } from './loans.service';

describe('LoansService', () => {
  let service: LoansService;
  let article: ArticleService

  const mockLoanRepository = {
    create: jest.fn().mockImplementation(dto=>dto),
    save: jest.fn().mockImplementation((loans)=>{
      return Promise.resolve({id:Date.now(),...loans})
    }),
    getLoans: jest.fn().mockImplementation(()=>{
      return[{status:"true"}]
    }),
    find: jest.fn().mockImplementation(()=>{
      return[{status:"true"}]
    }),
    findOne: jest.fn().mockImplementation(()=>{
      return[{id:'2'}]
    }),
    updateOnLoan: jest.fn().mockImplementation(()=>{
      return [ {idLoan:2}]
    })

  }

  const mockArticleService={
    getArticle: jest.fn()
  }
  const mockUserService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    
      providers: [LoansService,
      {
        provide:getRepositoryToken(Loan),
        useValue:mockLoanRepository
      },
      {
        provide:ArticleService,
        useValue:mockLoanRepository
      },
      {
        provide:UsersService,
        useValue:mockLoanRepository
      }
    ],
    })
    // .overrideProvider(ArticleService)
    // .useValue(mockArticleService).overrideProvider(UsersService).useValue(mockUserService)
    .compile();

    service = await module.get<LoansService>(LoansService);
    article = await module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new loan record and return that', async ()=>{
    const newLoans:CreateLoanDto ={
      userIdUsers: 0,
      articleIdArticle: 0
    }
    expect(mockArticleService.getArticle).toBeTruthy()

  })
  it('should return an array of loans', async ()=>{
    expect(await service.getLoans()).toMatchObject([{status:"true"}])
  })
  it('find a loan and return "find loan with id"', async ()=>{
    expect(await service.getOneLoan(2)).toMatchObject([{id:'2'}])
  })
  it('update loans (2, {status:"true"}),should return the title', async ()=>{
   const loanUpdate = {status:"true"}
    expect(await service.updateLoanById(2,loanUpdate[2])).toBeTruthy()
  })
});
