import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';

import { User } from './users/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: '123456',
      database: 'user_service',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
