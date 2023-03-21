import { HttpException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Article } from 'src/article/entities/article.entity';
import { ManyToOne } from 'typeorm';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:'Loan'})
export class Loan {
    @PrimaryGeneratedColumn()
    idLoan:number
    @Column({default:true})
    status:boolean
    @CreateDateColumn() 
    added_on:Date;
    @Column({default: 0})
    fee:number
    @Column({default: 0})
    deposit:number    
    @Column({nullable:true})
    checked_out:Date
    @Column({nullable:true})
    checked_in:Date
    @ManyToOne(type=>Article, (article)=>article.loans)
    article:Article | HttpException  
    @ManyToOne(type=>User, (user)=>user.loans)
    user:User | HttpException
  affected: number;

    

    

}
