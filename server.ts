const request = require('request-promise');

const { GithubUser } = require('./dtos/github-user.dto');
const insertAllUsersAsInLisbonFn = require('./features/users/insert-all-users');
const createUserTableFn = require('./features/users/create-user-table');
const dbConfig = require('./config/db-connection');

// Add more switch cases like "select specific, select all , delete, update"
switch (process.argv[2]) {
  case 'create':
    createUserTableFn(dbConfig);
    break;
  case 'insert':
    insertAllUsersAsInLisbonFn(dbConfig, request);
    break;
  default:
    createUserTableFn(dbConfig);
}
