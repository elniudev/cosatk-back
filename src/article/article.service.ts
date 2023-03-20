import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorysService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(Article)private aticleRepository:Repository <Article>,
 
  private categorysService:CategorysService){}

  async createArticle(article: CreateArticleDto){
   
    const newArticle = this.aticleRepository.create(article)
    return this.aticleRepository.save(newArticle)
  }
    
    getArticles() {
    return this.aticleRepository.find({
    relations:['category']
    })
  }

  async getArticle(idArticle: number) {
    const articleFound = await this.aticleRepository.findOne({
      where:{
        idArticle
      },
    })
    if(!articleFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return articleFound
  }

async getArticleByName(name:string): Promise<Article[] | HttpException> {
    const articleFound = await this.aticleRepository.find({
      where:{
        name
      },
    })
    if(!articleFound){
      return new HttpException('Article no found', HttpStatus.NOT_FOUND)
    }
    return articleFound
  }
  
  async getArticleByShown_On_Website(shown_on_website:false): Promise<Article[] | HttpException> {
    const articleFound = await this.aticleRepository.find({
      where:{
        shown_on_website
      },
    })
    if(!articleFound){
      return new HttpException('Article no found', HttpStatus.NOT_FOUND)
    }
    return articleFound
  }  

  async getArticleByIs_On_Loan(is_on_loan:true): Promise<Article[] | HttpException> {
    const articleFound = await this.aticleRepository.find({
      where:{
        is_on_loan
      },
    })
    if(!articleFound){
      return new HttpException('Article no found', HttpStatus.NOT_FOUND)
    }
    return articleFound
  } 

  async updateArticle(idArticle: number, article: UpdateArticleDto) {
    const articleFound = await this.aticleRepository.findOne({
      where:{
        idArticle
      },
    })
    if(!articleFound){
      return new  HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const updateArticle = Object.assign(articleFound, article)
    return this.aticleRepository.save(updateArticle)
  }

  async deleteArticle(idArticle: number) {
    const result = await this.aticleRepository.delete({idArticle});

    if(result.affected === 0){
      return new HttpException('user not fount', HttpStatus.NOT_FOUND)
    }
    return result
  }
}
