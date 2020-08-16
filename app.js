const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./Schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://aelabd:dbaelabdpass@cluster-zmcdq.mongodb.net/graphql?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Error: ", err.message));


app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("now Listening for requests on port 4000");
});
