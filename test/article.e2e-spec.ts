import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { Category } from '../src/category/entities/category.entity';

describe('ArticleController (e2e)', () => {
  let app: INestApplication;

  const mockArticleRepository = {
    find: jest.fn()
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(getRepositoryToken(Category))
    .useValue(mockArticleRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/article (GET)', () => {
    return request(app.getHttpServer())
      .get('/article')
      .expect(200)
  });
});