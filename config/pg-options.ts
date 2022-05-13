import { DBOptions } from '../dtos/db-options.dto';
const {
  postgres_user,
  postgres_password,
  postgres_port,
  postgres_host,
  postgres_database,
} = require('./config.json');

// Actual database options
const options: DBOptions = {
  user: postgres_user,
  password: postgres_password,
  port: postgres_port,
  host: postgres_host,
  database: postgres_database,
};

console.info(
  'Connecting to the database:',
  `${options.user}@${options.host}:${options.port}/${options.database}`
);

module.exports = options;
