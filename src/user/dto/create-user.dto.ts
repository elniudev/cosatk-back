/* eslint-disable prettier/prettier */
export class CreateUserDto {
    username:string
    first_name:string
    last_name:string
    membership?:string
    email?:string
    subscriber?:boolean
    telephone?:number
    adress?:string
    city?:string
    how_meet_us?:string
    dni?:string
    birth_date?:Date
    role:string
    password:string
    // password:string
}
