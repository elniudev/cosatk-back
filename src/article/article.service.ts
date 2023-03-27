import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { PatchArticleOnLoanDto } from './dto/patch-article-onloan.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private articleRepository:Repository <Article>,
 
  // private categorysService:CategoryService
  ){}

  async createArticle(article: CreateArticleDto){
   
    const newArticle = this.articleRepository.create(article)
    return this.articleRepository.save(newArticle)
  }
    
  async getArticles(): Promise<Article[]> {
    const articlesFound = await this.articleRepository.find({
    relations:['category']
    })
    return articlesFound
  }

  async getArticle(idArticle: number): Promise<Article> {
    const articleFound = await this.articleRepository.findOne({
      where:{
        idArticle
      },
    })
    if(!articleFound){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return articleFound
  }

  async getArticleImage(idArticle: number): Promise<Buffer> {
    const articleFound = await this.articleRepository.findOne({
      where:{
        idArticle
      },
    })
    if(!articleFound){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return articleFound.image
  }  

async getArticleByName(name:string): Promise<Article[] | HttpException> {
    const articleFound = await this.articleRepository.find({
      where:{
        name
      },
    })
    if(!articleFound){
      return new HttpException('Article no found', HttpStatus.NOT_FOUND)
    }
    return articleFound
  }

  async getArticleIdFromCode(articleCode:string): Promise<any> {
    const articleFound = await this.articleRepository.find({
      where:{
        code:articleCode
      },
    })
    if(!articleFound){
      return new HttpException('Article no found', HttpStatus.NOT_FOUND)
    }
    return articleFound
  }
  
  async getArticleByShown_On_Website(shown_on_website:false): Promise<Article[] | HttpException> {
    const articleFound = await this.articleRepository.find({
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
    const articleFound = await this.articleRepository.find({
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
    const articleFound = await this.articleRepository.findOne({
      where:{
        idArticle
      },
    })
    if(!articleFound){
      return new  HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const updateArticle = Object.assign(articleFound, article)
    return this.articleRepository.save(updateArticle)
  }

  async updateOnLoan(idArticle: number) {
    const articleFound = await this.articleRepository.findOne({
      where:{
        idArticle
      },
    })
    if(!articleFound){
      return new  HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    articleFound.is_on_loan = !articleFound.is_on_loan;
    console.log(articleFound.is_on_loan);
    return await this.articleRepository.save(articleFound)
  }  

  async deleteArticle(idArticle: number) {
    const result = await this.articleRepository.delete({idArticle});

    if(result.affected === 0){
      return new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async deleteArticleByCode(code: string) {
    const result = await this.articleRepository.delete({code});

    if(result.affected === 0){
      return new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    return result
  }  
}
