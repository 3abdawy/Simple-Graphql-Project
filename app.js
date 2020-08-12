const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./Schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ schema }));

app.listen(4000, () => {
  console.log("now Listening for requests on port 4000");
});
