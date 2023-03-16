import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    dni: string;

    @MinLength(4)
    @MaxLength(12)
    password: string;

}