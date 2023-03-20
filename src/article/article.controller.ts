import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { ArticlesService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticlesService) {}

  @Post('/create')
  createArticle(@Body() article: CreateArticleDto) {
    return this.articleService.createArticle(article);
  }

  @Get()
  getArticles():Promise<Article[]> {
    return this.articleService.getArticles();
  }

  @Get('/:idArticle')
  async getArticle(@Res()res:any, @Param('idArticle', ParseIntPipe) idArticle: number) {
    const article = await this.articleService.getArticle(idArticle)
    return res.status(HttpStatus.OK).json(article); 
  }

  @Get('/name/:name')
  async getArticleByName(@Res()res:any, @Param('name') name: string) {
    const article = await this.articleService.getArticleByName(name)
    return res.status(HttpStatus.OK).json(article); 
  }

  @Get('/shown_on_website/:shown_on_website')
  async getArticleByShown_On_Website(@Res()res:any, @Param('shown_on_website') shown_on_website: false) {
    const shown = await this.articleService.getArticleByShown_On_Website(shown_on_website)
    return res.status(HttpStatus.OK).json(shown); 
  }

  is_on_loan

  @Get('/is_on_loan/:is_on_loan')
  async getArticleByIs_On_Loan(@Res()res:any, @Param('is_on_loan') is_on_loan: true) {
    const is_on = await this.articleService.getArticleByIs_On_Loan(is_on_loan)
    return res.status(HttpStatus.OK).json(is_on); 
  }

  @Put('/:idArticle')
  update(@Param('idArticle') idArticle: number, @Body() article: UpdateArticleDto) {
    return this.articleService.updateArticle(idArticle, article);
  }

  @Delete('/:idArticle')
  deleteArticle(@Param('idArticle', ParseIntPipe) idArticle: number) {
    return this.articleService.deleteArticle(idArticle);
  }
}
