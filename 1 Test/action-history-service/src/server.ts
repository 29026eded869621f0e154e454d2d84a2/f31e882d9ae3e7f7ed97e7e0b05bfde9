import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './config/database';
import { listActionHistory } from './api/history/list';

import './redisClient';

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/history', listActionHistory);

sequelize.sync({ alter: true })
.then(() => {
  app.listen(3001, () => {
    console.log('Action History Service is running on port 3001');
  });
})
.catch((error: any) => {
  console.error('Unable to connect to the database:', error);
});
