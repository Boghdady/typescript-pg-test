function createUserTable(dbConfig) {
  dbConfig.db
    .none(
      'DROP TABLE IF EXISTS github_users; CREATE TABLE github_users (id BIGSERIAL, login TEXT, name TEXT, company TEXT, type TEXT, site_admin Boolean, repos_url TEXT, location TEXT, languages TEXT []); CREATE UNIQUE INDEX users_indexes ON github_users(login, name, company, type, site_admin, location)'
    )
    // .then(() =>
    //   request({
    //     uri: 'https://api.github.com/users/gaearon',
    //     headers: {
    //       'User-Agent': 'Request-Promise',
    //     },
    //     json: true,
    //   })
    // )
    // .then((data) =>
    //   dbConfig.db.one(
    //     'INSERT INTO github_users (login, name, company, type, site_admin, repos_url) VALUES ($[login], $[name], $[company], $[type], $[site_admin], $[repos_url] ) RETURNING id, login, name, company, type, site_admin, repos_url ',
    //     { ...data, name: process.argv[2] ? process.argv[2] : data.name }
    //   )
    // )
    .then((data) => console.log(data));
  // .then(() => process.exit(0));
}

module.exports = createUserTable;
