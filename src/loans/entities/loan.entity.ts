import { User } from 'src/user/entities/user.entity';
import { Article } from 'src/article/entities/article.entity';
import { JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne } from 'typeorm';
/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'Loan'})
export class Loan {
    @PrimaryGeneratedColumn()
    idLoan:number
    @Column({default:true})
    status:boolean
    @CreateDateColumn() 
    added_on: Date;
    @Column({default: 0})
    fee:number
    @Column({default: 0})
    deposit:number    
    @Column()
    checked_out:Date
    @Column()
    checked_in:Date
    @ManyToOne(type=>Article, (article)=>article.loans)
    @JoinColumn({name:'Article_idArticle'})
    article:Article
    @ManyToOne(type=>User, (user)=>user.loans)
    @JoinColumn()
    user:User

    

    

}
