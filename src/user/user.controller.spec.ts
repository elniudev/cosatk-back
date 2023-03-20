/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUsersService = {
      createUser: jest.fn(dto=>{
          return{
            id:Date.now(),
            ...dto
          }
      })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
      
    })
    
    .overrideProvider(UsersService)
    .useValue(mockUsersService)
    .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user', ()=>{
    expect(controller.createUser({
      first_name: 'freddy',
      username: '',
      last_name: '',
      role: '',
      password: ''
    })).toBeTruthy()
  })
 
});
