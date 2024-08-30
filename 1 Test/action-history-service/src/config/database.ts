import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('service', 'user', '123456', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: true,
});
