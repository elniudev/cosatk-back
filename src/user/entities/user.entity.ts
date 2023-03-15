import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    idUsers:number;

    @Column({type:'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    added_on:Date;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column({nullable:true})
    membership:string;

    @Column({nullable:true})
    email:string;

    @Column({nullable:true})
    subscriber:boolean;

    @Column({nullable:true})
    telephone:number;
    
    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    city:string;

    @Column({nullable:true})
    how_meet_us:string;

    @Column({unique:true})
    dni:string;

    @Column({type:'date', nullable:true})
    birth_date:Date;

    @Column({default:'user'})
    role:string;

    @Column()
    password:string;    
}

