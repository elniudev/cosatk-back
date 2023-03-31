/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
    ){}

  async createUser (userObject: CreateUserDto): Promise<User>{
    const userFound = await this.userRepository.findOne({
        where:{
            email:userObject.email
        }
    })

    if(userFound){
        throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const { password } = userObject;
    const plainToHash = await hash(password, 10)
    userObject = {...userObject, password:plainToHash};
    // const newUser = this.userRepository.create(userObject)
    return this.userRepository.save(userObject)
}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(idUsers: number): Promise<User | undefined> {
    const userFound = await this.userRepository.findOne({
      where:{
        idUsers
      },
    })
    if(!userFound){
      return 
    }
    return userFound
  }

  async getUsersByFirstName(first_name: string): Promise<User[] | HttpException> {
    const userFound = await this.userRepository.find({
      where:{
        first_name
      },
    })
    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }  

  async getUsersByLastName(last_name: string): Promise<User[] | HttpException> {
    const userFound = await this.userRepository.find({
      where:{
        last_name
      },
    })
    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  } 
  

  async getUserByDni(dni: string): Promise<User | HttpException> {
    const userFound = await this.userRepository.findOne({
      where:{
        dni
      },
    })
    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }  

    async getUserByEmail(email: string): Promise<User | HttpException> {
    const userFound = await this.userRepository.findOne({
      where:{
        email
      },
    })
    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }  

  async updateUserById(idUsers: number, user: UpdateUserDto) {
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

  async deleteUserById(idUsers: number) {
    const result = await this.userRepository.delete({idUsers});

    if(result.affected === 0){
      return new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    return result
  }
}
