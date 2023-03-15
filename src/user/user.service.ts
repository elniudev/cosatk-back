/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)private userRepository:Repository<User>){}

  // createUser(user: CreateUserDto){
  //       const newUser = this.userRepository.create(user)
  //       return this.userRepository.save(newUser)
  //   }

  async createUser (user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
        where:{
            email:user.email
        }
    })

    if(userFound){
        return new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
}

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(idUsers: number) {
    const userFound = await this.userRepository.findOne({
      where:{
        idUsers
      },
    })
    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }

  async update(idUsers: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where:{
        idUsers
      },
    })
    if(!userFound){
      return new  HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const updateUser = Object.assign(userFound, user)
    return this.userRepository.save(updateUser)
  }

  async deleteUser(idUsers: number) {
    const result = await this.userRepository.delete({idUsers});

    if(result.affected === 0){
      return new HttpException('user not fount', HttpStatus.NOT_FOUND)
    }
    return result
  }
}
