const request = require('request-promise');

const { GithubUser } = require('./dtos/github-user.dto');
const insertAllUsersAsInLisbonFn = require('./features/users/insert-all-users');
const createUserTableFn = require('./features/users/create-user-table');
const selectUserWithPreferredLanguagesAndLocationFn = require('./features/users/select-user-depend-on-lang-loc');
const listLanguagesForEachUserFn = require('./features/users/list-languages-for-each-user');
const insertUserLanguagesFn = require('./features/users/insert-user-language');

const dbConfig = require('./config/db-connection');

switch (process.argv[2]) {
  case 'create':
    createUserTableFn(dbConfig);
    break;
  case 'insert':
    insertAllUsersAsInLisbonFn(dbConfig, request);
    break;
  case 'list-each-user-langs-and-adding-to-db':
    listLanguagesForEachUserFn(request, process.argv[3]).then((languages) => {
      insertUserLanguagesFn(dbConfig, process.argv[3], languages);
    });
    break;
  case 'select-user-with-preferred-langs-and-location':
    selectUserWithPreferredLanguagesAndLocationFn(
      dbConfig,
      process.argv[3],
      process.argv[4]
    );
    break;
  default:
    createUserTableFn(dbConfig);
}
