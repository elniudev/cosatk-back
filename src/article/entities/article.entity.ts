import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:"Article"})
export class Article {
    @PrimaryGeneratedColumn()
    idArticle:number;

    @Column()
    code:string
    
    @Column()
    name:string; 

    @Column()               
    serial_number:string;
    
    @Column()
    condition:string;
    
    @Column()
    brand:string;   
    
    @Column()
    price_paid:number;
    
    @Column()
    value:number;    
    
    @Column()
    shown_on_website:number;
    
    @Column()
    loan_fee:Date; 
    
    @Column()
    loan_period:Date;
    
    @Column()
    short_description:string;
    
    @Column()
    long_description:string;
    
    @Column()
    components:string;
    
    @Column()
    care_information:string;
    
    @Column()
    owned_by:string; 
    
    @Column()
    donated_by:string;
    
    @Column()
    image:string;    
    
    @Column()
    Category_idCategory:number; 
    @Column()
    categoryIdCategory:number 

    @ManyToOne(()=>Category, category =>category.articles)
    category:Category;

     
}
