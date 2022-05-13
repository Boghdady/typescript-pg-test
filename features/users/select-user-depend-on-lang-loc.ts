/**
 * @desc   Select a user on a given location and with a given language preference
 * @param  {Object} dbConfig Shared database configuration object
 * @param  {String} languages  First condition in the select query
 * @param  {String} location   Second condition in the select query
 * @return {Promise<Object>} Will return user if matched the conditions
 */
function selectUserWithPreferredLanguagesAndLocation(
  dbConfig,
  languages,
  location
) {
  return dbConfig.db
    .one('SELECT * FROM github_users WHERE languages= $1 AND location= $2', [
      languages,
      location,
    ])
    .then((user) => console.log('select =>  ', user));
}

module.exports = selectUserWithPreferredLanguagesAndLocation;
