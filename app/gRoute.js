const app = module.exports = require('express')();
const path = require('path');
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema}= require('graphql-tools');
const {fileLoader, mergeTypes, mergeResolvers} = require('merge-graphql-schemas');

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.get('/', (req, res) => res.send('server up and running... go to /graphiql'))

app.use('/graphql', graphqlExpress({
  schema: schema
}));

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql', schema: schema}));
