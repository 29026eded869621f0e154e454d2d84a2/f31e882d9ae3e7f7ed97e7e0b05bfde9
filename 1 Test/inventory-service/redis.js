const redis = require('redis');

const REDIS_PASSWORD = '123456';

const publisher = redis.createClient({
    url: `redis://default:${REDIS_PASSWORD}@127.0.0.1:6379`,
});

publisher.on('error', (err) => {
    console.error('Redis error:', err);
});

publisher.connect().then(() => {
    console.log('Connected to Redis as publisher');
});

module.exports = publisher;
