module.exports = {
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  orm: {
    db: {
      client: 'postgresql',
      connection: {
        database: 'test_graphql',
        host: 'localhost',
        user: 'dev',
        password: 'dev'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: 'knex_migrations'
    },

    redis: {
      host: 'localhost',
      port: '6379',
      keyPrefix: 'tabelGraphql.api.'
    }
  },

  auth: {
    // 180 days in ms
    tokenLifetime: 365 * 24 * 3600 * 1000
  },
  headers: {
    authToken: 'auth-token'
  }
};
