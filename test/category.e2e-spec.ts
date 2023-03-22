import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { Category } from '../src/category/entities/category.entity';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;

  const mockCatgoryRepository = {
    find: jest.fn()
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(getRepositoryToken(Category))
    .useValue(mockCatgoryRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/category (GET)', () => {
    return request(app.getHttpServer())
      .get('/category')
      .expect(200)
  });
});


