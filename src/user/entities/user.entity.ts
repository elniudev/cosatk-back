/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'User'})
export class User {
    @PrimaryGeneratedColumn()
    idUsers:number;

    @Column()
    // added_on:Date;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    membership:number;

    @Column({unique:true})
    email:string;

    @Column()
    subscriber:number;

    @Column()
    telephone:number;
    
    @Column()
    adress:string;

    @Column()
    city:string;

    @Column()
    how_meet_us:string;

    @Column()
    dni:string;

    @Column()
    birth_date:Date;
}

