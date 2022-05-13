/**
 * @desc   If table exists drop table then create it, if it does not exist just create it
 * @param  {Object} dbConfig Shared database configuration object
 * @return {Promise}      Promise with resolving or reject
 */
function createUserTable(dbConfig) {
  return dbConfig.db
    .none(
      'DROP TABLE IF EXISTS github_users; CREATE TABLE github_users (id BIGSERIAL, login TEXT, name TEXT, company TEXT, type TEXT, site_admin Boolean, repos_url TEXT, location TEXT, languages TEXT []); CREATE UNIQUE INDEX users_indexes ON github_users(login, name, company, type, site_admin, location)'
    )
    .then((data) => console.log(data));
}

module.exports = createUserTable;
