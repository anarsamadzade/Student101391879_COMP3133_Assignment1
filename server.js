const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./src/config/db");
const typeDefs = require("./src/schema/index");
const userResolvers = require("./src/resolvers/userResolver");
const employeeResolvers = require("./src/resolvers/employeeResolver");

require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Create GraphQL Server
const server = new ApolloServer({
    typeDefs,
    resolvers: [userResolvers, employeeResolvers],
});

server.start().then(() => {
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 5007;
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
});
