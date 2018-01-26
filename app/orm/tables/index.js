const users = require('./users');

export default function loadTables(orm) {
  users(orm);
}
