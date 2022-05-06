import { DBOptions } from '../dtos/db-options.dto';

// Actual database options
const options: DBOptions = {
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  host: 'postgres',
  database: 'lovelystay_test',
};

console.info(
  'Connecting to the database:',
  `${options.user}@${options.host}:${options.port}/${options.database}`
);

module.exports = options;
