import {
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new HttpException(
        `validation:error. config error - missing env.${key}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return value;
  }

  getPort(): number {
    return +this.getValue('PORT', false) || 3000;
  }

  getValidationOptions(transform?: true): ValidationPipeOptions {
    const options: ValidationPipeOptions = {
      whitelist: true,
    };

    if (transform) {
      return {
        ...options,
        stopAtFirstError: false,
        transform: true,
        forbidNonWhitelisted: false,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
      };
    }

    return options;
  }

  getDbConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/modules/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
      logging: true,
      synchronize: false,
    };
  }

  getJwtSecret(): string {
    return this.getValue('JWT_SECRET');
  }

  getJwtExpiresIn(): string {
    return this.getValue('JWT_EXPIRES_IN');
  }
}

const configService = new ConfigService(process.env);

export { configService };
