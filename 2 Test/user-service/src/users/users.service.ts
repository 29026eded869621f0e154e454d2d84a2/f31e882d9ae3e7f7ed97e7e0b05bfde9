import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async updateProblemsFlag(): Promise<number> {
    const count = await this.userModel.count({ where: { problems: true } });

    await this.userModel.update({ problems: false }, { where: {} });

    return count;
  }
}
