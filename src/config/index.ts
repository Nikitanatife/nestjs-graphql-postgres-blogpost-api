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

  getNodeEnv(): string {
    return this.getValue('NODE_ENV', false) || 'development';
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

  getPostgresURL(): string {
    return this.getValue('POSTGRES_URL', false);
  }

  getPostgresTestURL(): string {
    return this.getValue('POSTGRES_TEST_URL', false);
  }

  getDbConfig(): DataSourceOptions {
    if (this.getNodeEnv() === 'test') {
      return {
        type: 'postgres',
        ...(this.getPostgresTestURL()
          ? {
              url: this.getPostgresTestURL(),
            }
          : {
              port: parseInt(this.getValue('POSTGRES_TEST_PORT')),
              host: this.getValue('POSTGRES_TEST_HOST') || 'localhost',
            }),
        username: this.getValue('POSTGRES_TEST_USER'),
        password: this.getValue('POSTGRES_TEST_PASSWORD'),
        database: this.getValue('POSTGRES_TEST_DB'),
        entities: ['src/modules/**/*.entity.ts'],
        migrations: ['src/migrations/*.ts'],
        migrationsTableName: 'migrations_typeorm',
        migrationsRun: true,
        logging: true,
        synchronize: true,
      };
    }

    return {
      type: 'postgres',
      ...(this.getPostgresURL()
        ? {
            url: this.getPostgresURL(),
          }
        : {
            port: parseInt(this.getValue('POSTGRES_PORT')),
            host: this.getValue('POSTGRES_HOST') || 'localhost',
          }),
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
