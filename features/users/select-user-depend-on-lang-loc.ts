function selectUserWithPreferredLanguagesAndLocation(
  dbConfig,
  language,
  location
) {
  dbConfig.db
    .any(
      `SELECT * FROM github_users WHERE '${language}'= ANY (languages) AND location= '${location}'`
    )
    .then((users) => console.log('select =>  ', users));
}

module.exports = selectUserWithPreferredLanguagesAndLocation;
