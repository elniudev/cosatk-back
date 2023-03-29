import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

describe('ArticleService', () => {
  let service: ArticleService;

  const mockArticleRepository = {
    create: jest.fn().mockImplementation(dto=>dto),
    save: jest.fn().mockImplementation((article)=>{
      return Promise.resolve({id:Date.now(), ...article})
    }),
    find: jest.fn().mockImplementation(()=>{
      return[{name:'herramientas'}]
    }),
    findOne: jest.fn().mockImplementation(()=>{
      return[{id:'1'}]
    }),
    updateArticle: jest.fn().mockImplementation(()=>{
      return[{id:'2'}]
   }),
    delete: jest.fn().mockImplementation(()=>{
      return[{id:'2'}]
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService,{
        provide:getRepositoryToken(Article),
        useValue: mockArticleRepository
      }],
    }).compile();
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should crate a new category record and return that', async ()=>{
    const newArticle:CreateArticleDto = {
      name: 'niño',
      code: '',
      shown_on_website: false,
      loan_fee: 0,
      loan_period: 0,
      deposit: 0,
      is_on_loan: false
    }
    expect(await service.createArticle(newArticle)).toMatchObject({
      id:expect.any(Number),...newArticle
    })
  })
  it('should return an array', async ()=>{
    expect(await service.getArticles()).toMatchObject([{name:'herramientas'}])
  })
  it('find a category should retur "find article whit id"', async ()=>{
    expect(await service.getArticle(1)).toMatchObject([{id:'1'}])
  })
  it('update category ("2", {category_name: "niño"}) should return the category_name', async() =>{

    const articleUpdate = {name: "niño"}
    expect(await service.updateArticle(1, articleUpdate)).toBeTruthy()

    })

  it('delete (2) sould return "delete whit article"', async ()=>{
    expect(await service.deleteArticle(2)).toMatchObject(([{id:'2'}]))
  })
})



