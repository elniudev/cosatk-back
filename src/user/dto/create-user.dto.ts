import { ApiProperty } from "@nestjs/swagger"

/* eslint-disable prettier/prettier */
export class CreateUserDto {
    @ApiProperty( {example: 'Peter'})
    first_name:string
    @ApiProperty( {example: 'Smith'})
    last_name:string
    @ApiProperty( {example: 'Gold'})
    membership?:string
    @ApiProperty( {example: 'peter03@gmail.com'})
    email:string
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
    role?:string
    @ApiProperty( {example: '12345678'})
    password?:string
   
}
