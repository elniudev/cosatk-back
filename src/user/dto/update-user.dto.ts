/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    added_on:Date
    first_name:string
    last_name:string
    membership:number
    email:string
    subscriber:number
    telephone:number
    adress:string
    city:string
    how_meet_us:string
    dni:string
    birth_date:Date
}
