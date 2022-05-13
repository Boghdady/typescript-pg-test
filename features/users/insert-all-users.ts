const { userColumns } = require('../../db/user-columns');

/**
 * @desc   list all users on the database registered on Github as being in Lisbon
 * @param  {Object} dbConfig Shared database configuration object
 * @param  {Object} request  To fetch remote data from github api
 */
function insertAllUsersAsInLisbon(dbConfig, request) {
  const cs = new dbConfig.pgp.helpers.ColumnSet(userColumns, {
    table: 'github_users',
  });

  request({
    uri: 'https://api.github.com/users',
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  }).then((users) => {
    const query = dbConfig.pgp.helpers.insert(users, cs);
    dbConfig.db.none(query);
  });
}

module.exports = insertAllUsersAsInLisbon;
