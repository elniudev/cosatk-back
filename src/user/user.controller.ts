/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() newUser:CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Get()
  getUsers():Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:idUsers')
  async getUser(@Res()res:any, @Param('idUsers', ParseIntPipe) idUsers: number) {
    const user = await this.userService.getUser(idUsers)
    return res.status(HttpStatus.OK).json(user); 
  }

  @Put(':idUsers')
  update(@Param('idUsers') idUsers: number, @Body() user: UpdateUserDto) {
    return this.userService.update(idUsers, user);
  }

  @Delete(':idUsers')
  deleteUser(@Param('idUsers', ParseIntPipe) idUsers: number) {
    return this.userService.deleteUser(idUsers);
  }
}
