const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./Schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cors-origin
app.use(cors());

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
