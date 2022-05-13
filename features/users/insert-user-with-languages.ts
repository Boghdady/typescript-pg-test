function insertUserWithPreferredLanguages(dbConfig, request, languages) {
  return request({
    uri: 'https://api.github.com/users/gaearon',
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  })
    .then((data) =>
      dbConfig.db.one(
        'INSERT INTO github_users (login, name, languages) VALUES ($[login], $[name], $[languages]) RETURNING id, name, languages',
        { ...data, languages: languages }
      )
    )
    .then((user) => console.log(user));
}

module.exports = insertUserWithPreferredLanguages;
