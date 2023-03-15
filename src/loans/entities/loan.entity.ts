/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    status:string
    @Column()
    added_on:Date
    @Column()
    first_name:string
    @Column()
    last_name:string
    @Column()
    article_name:string
    @Column()
    article_code:number
    @Column()
    fee:string
    @Column()
    checked_out:Date
    @Column()
    checked_in:Date
    @Column()
    Article_idArticle: number
    @Column()
    User_idUser : number
    @Column()
    Usr_idUser : number

}
