import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from 'src/user/user.controller';
import { User } from '../src/user/entities/user.entity';


describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUserRepository = {
    find:jest.fn()
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserController],
    })
    .overrideProvider(getRepositoryToken(User))
    .useValue(mockUserRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
  });
});
