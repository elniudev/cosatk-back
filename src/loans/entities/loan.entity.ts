import { HttpException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { Article } from '../../article/entities/article.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
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
    @Column({type:'date',nullable:true})
    checked_out:Date
    @Column({type:'date',nullable:true})
    checked_in:Date
    @ManyToOne(() => Article, (article) => article.loans, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'articleIdArticle' })
    article:Article | HttpException  
    @ManyToOne(() => User, (user) => user.loans, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userIdUsers' })
    user:User | HttpException
    @Column({nullable:true})
    userIdUsers : number
    @Column({nullable:true})
    articleIdArticle : number



    
    // @ManyToOne(type=>Article, (article)=>article.loans)
    // article:Article | HttpException  
    // @ManyToOne(type=>User, (user)=>user.loans)
    // user:User | HttpException
    

}
