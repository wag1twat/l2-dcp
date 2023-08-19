import { config } from 'dotenv';
import { dataSource } from './datasource';

config();

export const DATA_SOURCE = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => dataSource.initialize(),
  },
];
