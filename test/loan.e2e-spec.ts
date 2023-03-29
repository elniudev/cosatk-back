import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { Category } from '../src/category/entities/category.entity';

describe('LoanController (e2e)', () => {
  let app: INestApplication;

  const mockLoanRepository = {
    find: jest.fn()
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(getRepositoryToken(Category))
    .useValue(mockLoanRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/loans (GET)', () => {
    return request(app.getHttpServer())
      .get('/loans')
      .expect(200)
  });
});