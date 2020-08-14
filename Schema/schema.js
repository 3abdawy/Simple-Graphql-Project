const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

let books = [
  {
    name: "Name of the Wind",
    genre: "Fantasy",
    id: "1",
    authorId: "1"
  },
  {
    name: "The Final Empire",
    genre: "Fantasy",
    id: "2",
    authorId: "2"
  },
  {
    name: "The Long Earth",
    genre: "Sci-Fi",
    id: "3",
    authorId: "3"
  },
  {
    name: "The Hero of Ages",
    genre: "Fantasy",
    id: "4",
    authorId: "2"
  },
  {
    name: "The Colour Of Magic",
    genre: "Fantasy",
    id: "5",
    authorId: "3"
  },
  {
    name: "The Light Fantastic",
    genre: "Fantasy",
    id: "6",
    authorId: "3"
  }
];
let authors = [
  {
    name: "Jack ma",
    age: 33,
    id: "1"
  },
  {
    name: "The prince charles",
    age: 35,
    id: "2"
  },
  {
    name: "A Elabd",
    age: 24,
    id: "3"
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return authors.find(author => parent.authorId === author.id);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code to get data from db / other source
        return books.find(book => book.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id);
      }
    },
    books: {
      type:new GraphQLList(BookType),
      resolve(parent,args) {
        return books;
      }
    },
    authors: 
    {
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
