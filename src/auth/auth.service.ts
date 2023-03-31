import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private jwtAuthService:JwtService
  ){} //TODO:usar userservice y ponerlo en exports de user.module

  //TODO: Encapsulate Password Codification Service
  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;

    if(password){
      const plainToHash = await hash(password, 10)
      userObject = {...userObject, password:plainToHash};
    }

    const newUser = this.userRepository.create(userObject);
    const response = await this.userRepository.save(newUser);
    console.log(response);
    return response
  }

  async login(userObjectLogin: LoginAuthDto) {

    const { email, password } = userObjectLogin;
    const findUser = await this.userRepository.findOne({ where:{
        email
      },})
    if (!findUser) {
      throw new HttpException('ERROR_DATA_PROVIDED', 404);
    }
    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) {
      throw new HttpException('ERROR_DATA_PROVIDED', 404);
    }

    const payload = {id:findUser.idUsers, email: findUser.email, role: findUser.role};
    const token = this.jwtAuthService.sign(payload);
    
    const data = {
      user:findUser,
      token
    };

    return data;

  }
}
