/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() newUser:CreateUserDto) {
    return await this.userService.createUser(newUser);
  }

  @Get()
  async getUsers():Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('/:idUsers')
  async getUserById(@Res()res:any, @Param('idUsers', ParseIntPipe) idUsers: number) {
    const user = await this.userService.getUserById(idUsers)
    return res.status(HttpStatus.OK).json(user); 
  }

  @Get('/firstname/:nameUser')
  async getUsersByFirstName(@Res()res:any, @Param('nameUser') nameUser: string) {
    const user = await this.userService.getUsersByFirstName(nameUser)
    return res.status(HttpStatus.OK).json(user); 
  }

  @Get('/lastname/:lastnameUser')
  async getUsersByLastName(@Res()res:any, @Param('lastnameUser') lastnameUser: string) {
    const user = await this.userService.getUsersByLastName(lastnameUser)
    return res.status(HttpStatus.OK).json(user); 
  }  

  @Get('/username/:username')
  async getUsersByUsername(@Res()res:any, @Param('username') username: string) {
    const user = await this.userService.getUsersByUsername(username)
    return res.status(HttpStatus.OK).json(user); 
  }  

  @Get('/dni/:dni')
  async getUserByDni(@Res()res:any, @Param('dni') dni: string) {
    const user = await this.userService.getUserByDni(dni)
    return res.status(HttpStatus.OK).json(user); 
  }    

  @Get('/email/:email')
  async getUserByEmail(@Res()res:any, @Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email)
    return res.status(HttpStatus.OK).json(user); 
  }     

  @Put(':idUsers')
  updateUserById(@Param('idUsers') idUsers: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUserById(idUsers, user);
  }

  

  @Delete(':idUsers')
  deleteUserById(@Param('idUsers', ParseIntPipe) idUsers: number) {
    return this.userService.deleteUserById(idUsers);
  }
}
