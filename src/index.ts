import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import { prisma } from '../prisma/generated/prisma-client';
import * as express from 'express'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
  // context: req => ({
  //   ...req,
  //   db: new Prisma({
  //     endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
  //     secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
  //     debug: true, // log all GraphQL queries & mutations
  //   }),
})

server.express.use('/images', express.static('images'))

server.start(() => console.log(`Server is running on http://localhost:4000`))
