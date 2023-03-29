import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"Category"})
export class Category {
    @PrimaryGeneratedColumn()
    idCategory:number;

    @Column()
    category_name:string;


}
