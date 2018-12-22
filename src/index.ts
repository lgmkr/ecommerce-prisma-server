import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import { prisma } from '../prisma/generated/prisma-client/index';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
