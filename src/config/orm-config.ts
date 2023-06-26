import { DataSource } from 'typeorm';
import { configService } from './index';

export default new DataSource(configService.getDbConfig());
