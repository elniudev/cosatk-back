import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, HttpStatus, Put, UploadedFile, UseInterceptors, HttpException, UseGuards } from '@nestjs/common';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from '../article/dto/update-article.dto';
import { Article } from '../article/entities/article.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/files.helper';
import { ArticleFromData } from './dto/article-formData.dto';
import { ArticleService } from '../article/article.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/models/role.enum';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}


  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file',{limits: { fileSize: 3 * 1024 * 1024 }, fileFilter : fileFilter})) //3MB max
  createArticle(
    @Body() article: ArticleFromData,
    @UploadedFile() file: Express.Multer.File) {
      file.filename = file.originalname
      console.log(article);
      console.log(file);


    const parsedArticle = new CreateArticleDto();
    parsedArticle.brand = article?.brand ?? null
    parsedArticle.care_information = article?.care_information ?? null
    parsedArticle.code = article?.code ?? ""
    parsedArticle.components = article?.components ?? null
    parsedArticle.condition = article?.condition ?? null
    parsedArticle.donated_by = article?.donated_by ?? null
    parsedArticle.image = file.buffer
    parsedArticle.loan_fee = Number(article?.loan_fee ?? 0)
    parsedArticle.loan_period = Number(article?.loan_period ?? 0)
    parsedArticle.long_description = article?.long_description ?? null
    parsedArticle.name = article?.name ?? ""
    parsedArticle.owned_by = article?.owned_by ?? null
    parsedArticle.price_paid = Number(article?.price_paid ?? 0)
    parsedArticle.deposit = Number(article?.deposit ?? 0)
    parsedArticle.serial_number = article?.serial_number ?? null
    parsedArticle.short_description = article?.short_description ?? null
    parsedArticle.shown_on_website = article?.shown_on_website?.toLowerCase() === 'true'
    parsedArticle.value = Number(article?.value ?? 0)
    parsedArticle.categoryIdCategory = Number(article?.categoryIdCategory ?? 0)

    return this.articleService.createArticle(parsedArticle);
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

    @Get('/image/:idArticle')
  async getArticleImage(@Res()res:any, @Param('idArticle', ParseIntPipe) idArticle: number) {
    const article = await this.articleService.getArticle(idArticle)
    res.setHeader('Content-Type', 'image/png'); // Cambiar esto por el tipo de archivo correcto de la imagen
    res.send(article.image);

  }

  @Get('/name/:name')
  async getArticleByName(@Res()res:any, @Param('name') name: string) {
    const article = await this.articleService.getArticleByName(name)
    return res.status(HttpStatus.OK).json(article); 
  }

  @Get('/shown_on_website')
  async getArticlesByShown_On_Website(){
    // const shown = await this.articleService.getArticleByShown_On_Website()
    // return res.status(HttpStatus.OK).json(shown); 
    return `hola`
  }

  @Get('/is_on_loan/:is_on_loan')
  async getArticleByIs_On_Loan(@Res()res:any, @Param('is_on_loan') is_on_loan: true) {
    const is_on = await this.articleService.getArticleByIs_On_Loan(is_on_loan)
    return res.status(HttpStatus.OK).json(is_on); 
  }

  @Get('/findbycode/:code')
  async getArticleFromCode(@Res()res:any, @Param('code') articleCode: string) {
    const response = await this.articleService.getArticleFromCode(articleCode)
    return res.status(HttpStatus.OK).json(response); 
  }  

  @Put('/:idArticle')
  update(@Param('idArticle') idArticle: number, @Body() article: UpdateArticleDto) {
    return this.articleService.updateArticle(idArticle, article);
  }

  @Patch('/:idArticle')
  async patchArticle_On_Loan(@Param('idArticle') idArticle: number){
    return this.articleService.updateOnLoan(idArticle)
  }

  @Delete('/:idArticle')
  deleteArticle(@Param('idArticle', ParseIntPipe) idArticle: number) {
    return this.articleService.deleteArticle(idArticle);
  }

  @Delete('/deleteByCode/:code')
  deleteArticleByCode(@Param('code') code: string) {
    return this.articleService.deleteArticleByCode(code);
  }

}
