import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export class RegisterAuthDto {
    @ApiProperty( {example: 'peter03@gmail.com'})    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty( {example: '12345678'})
    @MinLength(4)
    @MaxLength(12)
    password: string;

    @ApiProperty( {example: 'Peter'})
    @IsNotEmpty()
    first_name:string;

    @ApiProperty( {example: 'Smith'})
    @IsNotEmpty()
    last_name:string;

    @ApiProperty( {example: 'Gold'})
    membership?:string
    
    @ApiProperty( {example: false})
    subscriber?:boolean

    @ApiProperty( {example: 666999333})
    telephone?:number

    @ApiProperty( {example: 'Carrer Bonavista 5'})
    adress?:string

    @ApiProperty( {example: 'Sant Joan de Mediona'})
    city?:string

    @ApiProperty( {example: 'Por la revista'})
    how_meet_us?:string

    @ApiProperty( {example: '567834845T'})
    dni?:string

    @ApiProperty( {example: '1982-11-02'})
    birth_date?:Date

    @ApiProperty( {example: 'user'})
    @IsNotEmpty()    
    role:string
}