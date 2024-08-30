import { createClient } from 'redis';

const REDIS_PASSWORD = '123456';


export const subscriber = createClient({
  url: `redis://default:${REDIS_PASSWORD}@127.0.0.1:6379`,
});

subscriber.on('error', (err) => {
  console.error('Redis error:', err);
});

subscriber.connect().then(() => {
  console.log('Connected to Redis');
});
