const request = require('request-promise');

const { GithubUser } = require('./dtos/github-user.dto');
const insertAllUsersAsInLisbonFn = require('./features/users/insert-all-users');
const createUserTableFn = require('./features/users/create-user-table');
const insertUserWithPreferredLanguagesFn = require('./features/users/insert-user-with-languages');
const selectUserWithPreferredLanguagesAndLocationFn = require('./features/users/select-user-depend-on-lang-loc');

const dbConfig = require('./config/db-connection');

// Add more switch cases like "select specific, select all , delete, update"
switch (process.argv[2]) {
  case 'create':
    createUserTableFn(dbConfig);
    break;
  case 'insert':
    insertAllUsersAsInLisbonFn(dbConfig, request);
    break;
  case 'insert-user-with-preferred-langs':
    insertUserWithPreferredLanguagesFn(dbConfig, request, ['JS', 'Java', 'C#']);
    break;
  case 'select-user-with-preferred-langs-and-location':
    selectUserWithPreferredLanguagesAndLocationFn(dbConfig, 'Java', 'Egypt');
    break;
  default:
    createUserTableFn(dbConfig);
}
