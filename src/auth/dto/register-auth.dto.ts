import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export class RegisterAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    password: string;

    @IsNotEmpty()
    first_name:string;

    @IsNotEmpty()
    last_name:string;
}