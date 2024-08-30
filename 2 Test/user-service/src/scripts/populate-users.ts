import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: '123456',
  database: 'user_service',
  models: [User],
});

async function populateUsers() {
  await sequelize.sync({ force: true });

  const users = [];
  for (let i = 0; i < 1000000; i++) {
    users.push({
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      age: 20 + (i % 50),
      gender: i % 2 === 0 ? 'male' : 'female',
      problems: i % 3 === 0,
    });
  }

  await User.bulkCreate(users, { validate: true });
  console.log('Populated 1 million users');
}

populateUsers().then(() => {
  sequelize.close();
});
