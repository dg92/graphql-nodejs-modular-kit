function up(knex) {
  return knex.schema.createTable('users', (t) => {
    t.uuid('id').primary();
    t.string('email').unique();
    t.string('password');
    t.timestamps();
  });
}

function down(knex) {
  return knex.schema.dropTable('users');
}

module.exports = {up, down};
