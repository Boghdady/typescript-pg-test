const pgPromise = require('pg-promise');
const R = require('ramda');
const request = require('request-promise');

// Limit the amount of debugging of SQL expressions
const trimLogsSize: number = 200;

// Database interface
interface DBOptions {
  host: string;
  database: string;
  user?: string;
  password?: string;
  port?: number;
}

// Actual database options
const options: DBOptions = {
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  host: 'postgres',
  database: 'lovelystay_test',
};

console.info(
  'Connecting to the database:',
  `${options.user}@${options.host}:${options.port}/${options.database}`
);

const pgpDefaultConfig = {
  promiseLib: require('bluebird'),
  // Log all querys
  query(query) {
    console.log('[SQL   ]', R.take(trimLogsSize, query.query));
  },
  // On error, please show me the SQL
  error(err, e) {
    if (e.query) {
      console.error('[SQL   ]', R.take(trimLogsSize, e.query), err);
    }
  },
};

interface GithubUsers {
  id: number;
  name?: string;
  login?: string;
  company?: string;
  type?: string;
  site_admin?: boolean;
}

const pgp = pgPromise(pgpDefaultConfig);
const db = pgp(options);

db.none(
  'DROP TABLE IF EXISTS github_users; CREATE TABLE github_users (id BIGSERIAL, login TEXT, name TEXT, company TEXT, type TEXT, site_admin Boolean)'
)
  .then(() =>
    request({
      uri: 'https://api.github.com/users/gaearon',
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    })
  )
  .then((data: GithubUsers) =>
    db.one(
      'INSERT INTO github_users (login, name, company, type, site_admin) VALUES ($[login], $[name], $[company], $[type], $[site_admin]) RETURNING id, login, name, company, type, site_admin ',
      { ...data, name: process.argv[2] ? process.argv[2] : data.name }
    )
  )
  .then((data: GithubUsers) => console.log(data))
  .then(() => process.exit(0));
