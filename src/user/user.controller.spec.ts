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
      }),
      updateUserById: jest.fn((idUser, dto)=>({
        idUser,
        ...dto
      })),
      getUserById: jest.fn().mockImplementation(()=>{
        return [{idUser:'1'}]
      }),
      getUsers: jest.fn().mockImplementation(()=>{
        return [{idUser:'1'}]
      }),
      deleteUserById: jest.fn().mockImplementation(()=>{
        return [{idUser:'1'}]
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
      last_name: '',
      role: '',
      password: '',
      email: ''
    })).toBeTruthy()
  })
  it('should update a category', ()=>{
    const dto = {
      idUser:1,
      first_name:''
    }
    expect(controller.updateUserById(1, dto)).toEqual({ idUser:1,
      first_name:''})
  })
  it('find a user should return "user whit idUser"', async()=>{
    expect(mockUsersService.getUserById('')).toBeTruthy()
  })
  it('should return an array', ()=>{
    expect(mockUsersService.getUsers()).toMatchObject([{idUser:'1'}])
  })
  it('delete (1) should return "delete whit user"', ()=>{
    expect(mockUsersService.deleteUserById).toBeTruthy()
  })
 
});
