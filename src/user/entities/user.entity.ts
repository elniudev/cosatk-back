import { Loan } from 'src/loans/entities/loan.entity';
import { CreateDateColumn, OneToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class User {
    @PrimaryGeneratedColumn()
    idUsers:number;

    @CreateDateColumn()
    added_on:Date;

    @Column({unique: true})
    username: string;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column({nullable:true})
    membership:string;

    @Column({nullable:true, unique:true})
    email:string;

    @Column({nullable:true, default: false})
    subscriber:boolean;

    @Column({nullable:true})
    telephone:number;
    
    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    city:string;

    @Column({nullable:true})
    how_meet_us:string;

    @Column({nullable:true, unique:true})
    dni:string;

    @Column({type:'date', nullable:true})
    birth_date:Date;

    @Column({default:'user'})
    role:string;

    @Column({default:'12345678'})
    password:string; 

    @OneToMany(type=>Loan,(loan)=>loan.user)
    loans: Loan[];

}

