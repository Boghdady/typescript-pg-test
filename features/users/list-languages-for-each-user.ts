/**
 * @desc   List of languages for specific user
 * @param  {Object} request  To fetch remote data from github api
 * @param  {String} username  Parameter that we will inject it into github api resource
 * @return {Promise<String[]>} Will return list of non redundant user languages
 */
function listLanguagesForEachUser(request, username) {
  return request({
    uri: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  }).then((data) => {
    const languageList = data.map((repo) => repo.language);
    return [...new Set(languageList)].filter((lang) => lang);
  });
}

module.exports = listLanguagesForEachUser;
