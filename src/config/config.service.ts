import { Category } from '../category/entities/category.entity';
import { Article } from '../article/entities/article.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Loan } from '../loans/entities/loan.entity';
import { Auth } from '../auth/entities/auth.entity';
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
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: this.getValue('C_HOST'),
      port: parseInt(this.getValue('C_PORT')),
      username: this.getValue('C_USER'),
      password: this.getValue('C_PASSWORD'),
      database: this.getValue('C_DATABASE'),

      entities: ['dist/**/*.entity.js', User, Article, Category, Loan, Auth],
      //entities: [__dirname + '/../**/*.entity{.js,.ts}'],

      synchronize: this.getValue('C_SYNCHRONIZE') === 'true',
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'C_HOST',
  'C_PORT',
  'C_USER',
  'C_PASSWORD',
  'C_DATABASE',
]);

export { configService };
