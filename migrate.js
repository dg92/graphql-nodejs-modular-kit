const migrate = require('tabel/lib/migrate');
const config = require('./config').orm;

migrate(config);
