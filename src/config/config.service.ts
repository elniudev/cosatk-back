import { Category } from 'src/category/entities/category.entity';
import { Article } from 'src/article/entities/article.entity';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Loan } from "src/loans/entities/loan.entity";

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: this.getValue('COSATK_HOST'),
      port: parseInt(this.getValue('COSATK_PORT')),
      username: this.getValue('COSATK_USER'),
      password: this.getValue('COSATK_PASSWORD'),
      database: this.getValue('COSATK_DATABASE'),

      entities: ['dist/**/*.entity.js', User, Article, Category, Loan],
      //entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      
      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'COSATK_HOST',
  'COSATK_PORT',
  'COSATK_USER',
  'COSATK_PASSWORD',
  'COSATK_DATABASE',
]);

export { configService };