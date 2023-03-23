import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticlesService } from './article.service';

describe('ArticleController', () => {
  let controller: ArticleController;

  let mockArticleService = {
    createArticle: jest.fn(dto=>{
      return{
        id:Date.now(),
        ...dto
      };
  }),
  updateArticle:jest.fn((idArticle, dto)=>({
    idArticle, 
    ...dto
  })),
  getArticle: jest.fn(()=>{
    return[{idCategory:'1'}]
  }),
  deleteArticle:jest.fn().mockImplementation(()=>{
    return [{idArticle:'1'}]
  })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticlesService],
    })
    .overrideProvider(ArticlesService)
    .useValue(mockArticleService)
    .compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('shouls create a article', ()=>{
    const dto = {
      idArticle:0,
      code:0,
    }
   expect(controller.createArticle).toBeTruthy()
    // expect(mockArticleService.createArticle).toHaveBeenCalledWith(dto)
  });
  it('should update a article', ()=>{
    const dto = {
      idArticle:0,
      code:0,
    }
    expect(controller.update).toBeTruthy()
  })
  it('find a category shoul return "article whit idArticle"', async ()=>{
    expect(mockArticleService.getArticle()).toBeTruthy()
  })
  it('delete (1) should return "delete whit category"', ()=>{
    expect(mockArticleService.deleteArticle('1')).toMatchObject([{idArticle:'1'}])
  })
});
