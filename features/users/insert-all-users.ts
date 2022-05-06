// // const dbConfigurations = require('../../config/db-connection');
// const req = require('request-promise');
// our set of columns, to be created only once (statically), and then reused,
// to let it cache up its formatting templates for high performance:
function insertAllUsersAsInLisbon(dbConfig, request) {
  const cs = new dbConfig.pgp.helpers.ColumnSet(
    [
      { name: 'login', def: null },
      { name: 'name', def: null },
      { name: 'company', def: null },
      { name: 'type', def: null },
      { name: 'site_admin', def: null },
      { name: 'repos_url', def: null },
      {
        name: 'location',
        init(col) {
          return (col.value = 'Lisbon');
        },
      },
    ],
    {
      table: 'github_users',
    }
  );

  request({
    uri: 'https://api.github.com/users',
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  }).then((users) => {
    console.log(users);
    // generating a multi-row insert query:
    const query = dbConfig.pgp.helpers.insert(users, cs);
    // executing the query:
    dbConfig.db.none(query);
  });
  // .then(() => process.exit(0));
}

module.exports = insertAllUsersAsInLisbon;
