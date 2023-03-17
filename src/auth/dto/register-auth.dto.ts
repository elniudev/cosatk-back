import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto {
    @IsNotEmpty()
    username: string;

    @MinLength(4)
    @MaxLength(12)
    password: string;

    @IsNotEmpty()
    first_name:string;

    @IsNotEmpty()
    last_name:string;
}