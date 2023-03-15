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

  @Put('/:idArticle')
  update(@Param('idArticle') idArticle: number, @Body() article: UpdateArticleDto) {
    return this.articleService.updateArticle(idArticle, article);
  }

  @Delete('/:idArticle')
  deleteArticle(@Param('idArticle', ParseIntPipe) idArticle: number) {
    return this.articleService.deleteArticle(idArticle);
  }
}
