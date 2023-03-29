/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

describe('UserService', () => {
  let service: UsersService;
  const mockUserRepository = {
    create: jest.fn().mockImplementation(dto=>dto),
    save: jest.fn().mockImplementation((user)=>{
      return Promise.resolve({id:Date.now(), ...user})
    }),
    findOne: jest.fn().mockImplementation(()=>{
      return[{idUser:'1'}]
    }),
    find: jest.fn().mockImplementation(()=>{
      return[{idUser:'1'}]
    }),
    delete: jest.fn().mockImplementation(()=>{
      return[{idUser:'1'}]
    })

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide:getRepositoryToken(User),
        useValue:mockUserRepository,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new user record an return that', async ()=>{
    const newUser:CreateUserDto = {
      first_name: '',
      last_name: '',
      email: ''
    }
    expect(await service.createUser(newUser)).toBeTruthy()
  })
  it('should return an array', async ()=>{
    expect(await service.getUsers()).toMatchObject([{idUser:'1'}])
  })
  it('find a category should retunr "find user whit id"', async()=>{
    expect(await service.getUserById(1)).toMatchObject([{idUser:'1'}])
  })
  it('update user ("1", {first_name:"Freddy"}) should return the user', async ()=>{
    const userUpdate = {first_name:"Freddy"}
    expect(await service.updateUserById(1, userUpdate[0])).toBeTruthy()
  })
  it('delete (1) should return "delete whit user"', async ()=>{
    expect(await service.deleteUserById(1)).toBeTruthy()
  })
});
