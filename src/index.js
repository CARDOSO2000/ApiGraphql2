import db from "./db"
import {GraphQLServer, PubSub } from 'graphql-yoga'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import Mutation from "./resolvers/Mutations"
import Query from "./resolvers/Query"
import Subscription from "./resolvers/Subscription"

const pubSub = new PubSub()

const resolvers = {
    Query: Query,
    Mutation: Mutation,
    Subscription: Subscription
  }
  
  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers,
    context: {
        db,
        pubSub
    }
})

server.start({
    port: 4200
}, () => console.log ('Servidor em execução'))