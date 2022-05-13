const pgPromise = require('pg-promise');

const pgpConfig = require('./pgp-config');
const opts = require('./pg-options');

const pgp = pgPromise(pgpConfig);
const db = pgp(opts);

module.exports = { db, pgp };
