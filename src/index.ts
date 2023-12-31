import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema";
import * as mongoose from "mongoose";
import { resolvers } from "./resolver/resolver";

//Load db methods
import { mongoDataMethods } from "../data/db";
import { Book } from "../models/Book";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://manhvu2002:1234@cluster0.yeujnyb.mongodb.net/?retryWrites=true&w=majority",
      {
        autoIndex: true,
        autoCreate: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context: async () => ({ mongoDataMethods }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
