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

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),

      entities: ['dist/**/*.entity.js', User, Article, Category, Loan, Auth],
      //entities: [__dirname + '/../**/*.entity{.js,.ts}'],

      synchronize: this.getValue('DB_SYNCHRONIZE') === 'true',
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
  'DB_SYNCHRONIZE',
  'MYSQLDB_LOCAL_PORT',
  'MYSQLDB_DOCKER_PORT',
  'DB_ROOT_PASSWORD',
  'NESTJS_LOCAL_PORT',
  'NESTJS_DOCKER_PORT',
]);

export { configService };
