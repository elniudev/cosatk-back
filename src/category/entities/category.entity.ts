import { Article } from "src/article/entities/article.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"Category"})
export class Category {
    @PrimaryGeneratedColumn()
    idCategory:number;

    @Column()
    category_name:string;


    @OneToMany(()=> Article, article => article.category)
    articles:Article[];



   
}
