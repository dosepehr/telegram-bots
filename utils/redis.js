import redis from 'redis';
const client = redis.createClient();

client.on('error', (err) => console.log(err));
client.connect().then(() => console.log('Redis connected'));

export default client;
