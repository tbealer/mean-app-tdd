var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/first-mean-app',
  test: 'mongodb://localhost/first-mean-app-testing',
  production: process.env.MONGODB_URI
};

// config.SALT_WORK_FACTOR = {
//   development: 10,
//   test: 10,
//   production: 12
// };
config.SALT_WORK_FACTOR = 10;
consig.TOKEN_SECRET = '\xbe\x87cq\xf29\xb9\xa1D\x8f[e\x8b\xeb\x04\x81\xe5\xf6i\xf5\xa0\x19\xad\x06\xdb';

module.exports = config;