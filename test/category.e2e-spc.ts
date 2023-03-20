import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from 'src/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryController } from 'src/category/category.controller';
import { Category } from 'src/category/entities/category.entity';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;

  const mockCategoryRepository = {
    find:jest.fn()
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CategoryController],
    })
    .overrideProvider(getRepositoryToken(Category))
    .useValue(mockCategoryRepository)
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
