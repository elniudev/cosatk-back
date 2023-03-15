import { Article } from "src/article/entities/article.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"Category"})
export class Category {
    @PrimaryGeneratedColumn()
    idCategory:number;

    @Column()
    category_name:string;

    // @OneToMany(()=>Article, article =>article.category)
    // articles:Article[]

    @OneToMany(()=>Category, category =>category.articles)
    articles:Article[];
}
