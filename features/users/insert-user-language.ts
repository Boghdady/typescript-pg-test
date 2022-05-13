/**
 * @desc    Add user languages information to the database
 * @param {Object} dbConfig Shared database configuration object
 * @param {String} username The condition that we will insert user languages depend on it
 * @param {String[]} userLanguages List of languages for specific user
 */

function insertUserLanguages(dbConfig, username, userLanguages) {
  dbConfig.db.none('UPDATE github_users SET languages = $1 WHERE login = $2', [
    userLanguages,
    username,
  ]);
}

module.exports = insertUserLanguages;
