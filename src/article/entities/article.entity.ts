import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:"Article"})
export class Article {
    @PrimaryGeneratedColumn()
    idArticle:number;

    @Column({unique:true})
    code:string
    
    @Column()
    name:string; 

    @Column({nullable:true})               
    serial_number:string;
    
    @Column({nullable:true})
    condition:string;
    
    @Column({nullable:true})
    brand:string;   
    
    @Column({nullable:true})
    price_paid:number;
    
    @Column({nullable:true})
    value:number;    
    
    @Column({default:true})
    shown_on_website:boolean;
    
    @Column({default: 0})
    loan_fee:number; 
    
    @Column({default: 7})
    loan_period:number;
    
    @Column({nullable:true})
    short_description:string;
    
    @Column({type:'varchar', length:'1500', nullable:true})
    long_description:string;
    
    @Column({nullable:true})
    components:string;
    
    @Column({nullable:true})
    care_information:string;
    
    @Column({nullable:true})
    owned_by:string; 
    
    @Column({nullable:true})
    donated_by:string;
    
    @Column({type:'mediumblob', nullable:true})
    image:Buffer;    
    
    // @Column()
    // Category_idCategory:number; 
    // @Column()
    // categoryIdCategory:number 

    @ManyToOne(()=>Category, category =>category.idCategory)
    category:Category;


}
