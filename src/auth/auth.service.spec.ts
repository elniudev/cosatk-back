import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;
  let user: UsersService
  let Jwt:JwtService

  const mockAuthrepository = {}
  const mockJwtStrategyRepository = {}
  const mockUserRepository = {}
  const mockJwtRepository={
    sign: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtModule,{
        provide:getRepositoryToken(User),
        useValue:mockAuthrepository
      },
      {
        provide:JwtService,
        useValue:mockJwtStrategyRepository
      },
     {
        provide:UsersService,
        useValue:mockUserRepository
     },
     {
        provide:JwtService,
        useValue:mockJwtRepository
     }
    ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = module.get<UsersService>(UsersService)
    Jwt = module.get<JwtService>(JwtService)

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});